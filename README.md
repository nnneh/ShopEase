# ShopEase - E-commerce Platform

ShopEase is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js with Next.js, and Node.js). This project is designed to provide users with an easy and smooth online shopping experience, including Browse products, user authentication, cart management, and order processing.

---

## Technologies Used

### Frontend
- Next.js (React framework)  
- JavaScript (ES6+)  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB with Mongoose  

### Authentication
- JSON Web Tokens (JWT)  

### Version Control
- Git  

---

## Project Features and Roadmap

### Phase 1: Core Features
- [ ] Display list of products  
- [ ] Show product details  
- [ ] User registration and login  
- [ ] Protect routes for authenticated users  

### Phase 2: Shopping Cart
- [ ] Add/remove products to/from cart  
- [ ] View and update cart items  

### Phase 3: Orders
- [ ] Place orders and checkout  
- [ ] Collect shipping and payment info (simulated)  
- [ ] Show order confirmation and history  

### Phase 4: Admin Panel (Learning Phase)
- [ ] Add, update, delete products (admin only)  
- [ ] Manage orders  

### Future Ideas
- [ ] Product reviews and ratings  
- [ ] Wishlist  
- [ ] Email notifications  
- [ ] Social media login integration  

---

## Getting Started

### Prerequisites
- Node.js installed  
- MongoDB database (local or cloud)  

### Installation Steps

1.  **Clone the repository:**

    ```bash
    git clone [[https://github.com/nnneh/ShopEase.git](https://github.com/nnneh/ShopEase.git)]
    cd [cd ShopEase]
    ```

2.  **Install backend dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    
    ```bash
    cd client
    npm install
    ```

4.  **Configure environment variables:**
    * Create a `.env` file in the `backend` directory.
    * Add necessary environment variables (e.g., database connection string, API keys).As:
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NEXT_PUBLIC_API_URL=http:localhost:5000/api
    
    

5.  **Start the backend server:**

    ```bash
    cd server
    npm run dev
    ```

6.  **Start the frontend application:**

    ```bash
    cd client
    npm run dev
    ```