import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        bookedById: { // The user who placed the order/booking
            type: Schema.Types.ObjectId,
            ref: "User", // References the User model
            required: true,
        },
        productId: { // The specific product being ordered/booked
            type: Schema.Types.ObjectId,
            ref: "Product", // References the Product model
            required: true,
        },
        // Denormalized product details for historical accuracy
        productTitle: { // To store product title at the time of order
            type: String,
            required: true
        },
        productPriceAtOrder: { // To store product price at the time of order
            type: Number,
            required: true,
            min: 0
        },
        productImage: { // To store product main image at the time of order
            type: String
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: { // Calculated total for this specific order item (quantity * productPriceAtOrder)
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled", "Refunded"], // Adjusted statuses
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Card", "Online"],
            default: "Cash",
        },
        isPaid: { // Explicitly track payment status
            type: Boolean,
            required: true,
            default: false
        },
        paidAt: { // Timestamp for when payment was received
            type: Date
        },
        // Optional: Seller ID if each product is associated with a specific seller/user
        // sellerId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User" // References the User model (the seller of this product)
        // },
    },

    {
        timestamps: true
    }
);

// Pre-save hook to calculate total price before saving
orderSchema.pre('save', function(next) {
    if (this.isModified('quantity') || this.isModified('productPriceAtOrder')) {
        this.totalPrice = this.quantity * this.productPriceAtOrder;
    }
    next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
