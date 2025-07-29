// routes/orderRouter.js
import { Router } from "express";
import Order from "../models/order.js";
import Product from "../models/product.js"; // Make sure your Product model has 'stock' and 'price'

const orderRouter = Router();

// Create Order
orderRouter.post("/orders", async (req, res) => {
    const { bookedById, productId, quantity, paymentMethod } = req.body;

    try {
        if (!bookedById || !productId || !quantity) {
            return res.status(400).json({ message: "Missing required fields: bookedById, productId, quantity" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Ensure Product schema has a 'stock' field. If it's 'availableQuantity', adjust here.
        if (product.stock === undefined || product.stock < quantity) {
            return res.status(400).json({ message: `Insufficient stock for product: ${product.title}. Available: ${product.stock || 0}` });
        }

        // Decrease stock and save the product
        product.stock -= quantity;
        await product.save();

        // Create the new order with denormalized product details
        const order = new Order({
            bookedById,
            productId,
            productTitle: product.title,
            productPriceAtOrder: product.price, // Assuming 'price' is the field in Product model
            productImage: product.images && product.images.length > 0 ? product.images[0] : null,
            quantity,
            paymentMethod,
            sellerId: product.sellerId // Assuming product.sellerId is populated or exists on the product
            // totalPrice will be set by the pre-save hook in the Order model
            // status will default to "Pending", isPaid to false
        });

        await order.save(); // The pre-save hook for totalPrice will run here

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order due to server error. Please check server logs." });
    }
});

// Get All Orders
orderRouter.get("/orders", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const totalDbOrders = await Order.countDocuments();

        const orders = await Order.find()
            .populate("bookedById", "name email") // Populate user details
            .populate("productId", "title images") // Populate some product details (if needed beyond denormalized)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({ orders, totalDbOrders });
    } catch (error) {
        console.error('Error while getting all orders:', error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Get Orders by User ID
orderRouter.get("/orders/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ bookedById: req.params.userId })
            .populate("bookedById", "name email")
            .populate({
                path: "productId",
                select: "title images price sellerId", // Ensure these fields exist in Product model
                populate: {
                    path: "sellerId",
                    model: "User", // Explicitly define the model if it's not standard
                    select: "name email phoneNumber" // Fields to get from the seller user
                },
            });

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error(`Error while getting orders for user ${req.params.userId}:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        res.status(500).json({ error: "Failed to fetch user orders" });
    }
});

// Cancel Order
orderRouter.patch("/orders/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure status matches the enum values in your Order schema (e.g., "Pending", "Confirmed")
        if (order.status !== 'Pending' && order.status !== 'Confirmed') {
            return res.status(400).json({ message: `Order cannot be cancelled in "${order.status}" status. Only "Pending" or "Confirmed" orders can be cancelled.` });
        }

        order.status = 'Cancelled';
        // Optional: Add a cancelledAt timestamp
        // order.cancelledAt = new Date();
        await order.save();

        // Increment product stock back
        await Product.findByIdAndUpdate(
            order.productId,
            { $inc: { stock: order.quantity } }, // Ensure 'stock' field exists in Product model
            { new: true }
        );

        res.status(200).json({ message: "Order cancelled successfully", order });

    } catch (error) {
        console.error('Error while cancelling order:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid Order ID format" });
        }
        res.status(500).json({ message: 'Error while cancelling order' });
    }
});

export default orderRouter;