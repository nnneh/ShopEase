# ShopEase - E-commerce Platform
---

## Table of Contents

* [About](#about)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Project Phases & Progress](#project-phases--progress)
* [Getting Started](#getting-started)
* [Contact](#contact)

---

## About

ShopEase is a full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express.js, React.js with Next.js, and Node.js). This project is designed to provide users with an easy and smooth online shopping experience, encompassing product Browse, secure user authentication, efficient cart management, and streamlined order processing. Our goal is to create a robust and user-friendly platform for online retail.

---

## Features

### Core Features

* **Product Display**: Browse a comprehensive list of available products.
* **Product Details**: View in-depth information for each product.
* **User Authentication**: Secure registration and login for customers.
* **Protected Routes**: Ensure only authenticated users can access sensitive parts of the application.
* **Shopping Cart Management**: Add, remove, and update items in the shopping cart.
* **Order Placement**: Seamless checkout process for placing orders.
* **Order History**: View past orders and their details.
* **Admin Panel (Planned)**: Tools for administrators to manage products and orders.

### Future Enhancements

* **Product Reviews & Ratings**: Allow users to review purchased products.
* **Wishlist**: Save desired products for later purchase.
* **Email Notifications**: Send transactional emails (order confirmation, shipping updates, etc.).
* **Social Media Login Integration**: Offer convenient login via popular social platforms.

---

## Technology Stack

ShopEase is built using the following technologies:

### Frontend

* **Next.js**: React framework for building production-ready applications.
* **JavaScript (ES6+)**: Core programming language.
* **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

### Backend

* **Node.js**: JavaScript runtime environment.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.

### Database

* **MongoDB**: A NoSQL, document-oriented database.
* **Mongoose**: MongoDB object data modeling (ODM) for Node.js, providing schema-based solutions.

### Authentication

* **JSON Web Tokens (JWT)**: For secure authentication and authorization.

### Version Control

* **Git**: Distributed version control system.

---

## Project Phases & Progress

We are developing ShopEase in distinct phases to ensure a robust and scalable application.

### Phase 1: Core Features (Currently in Progress)

**Goal**: Establish fundamental product Browse, user authentication, and basic product details display.

* **Frontend**:
    * 🟣 Display list of products
    * 🟣 Show product details
    * ✅ User registration and login
    * 🟣 Protect routes for authenticated users
* **Backend**:
    * ✅ API endpoint for User Registration (`/api/auth/register`)
    * ✅ API endpoint for User Login (`/api/auth/login`)
    * ✅ JWT-based Authentication Middleware
    * 🟣 API endpoint for Product Listing (`/api/products`)
    * 🟣 API endpoint for Single Product Details (`/api/products/:id`)


### Phase 2: Shopping Cart

**Goal**: Implement full shopping cart functionality.

* 🟣 Add/remove products to/from cart
* 🟣 View and update cart items

### Phase 3: Orders

**Goal**: Develop the order placement and history features.

* 🟣 Place orders and checkout
* 🟣 Collect shipping and payment info (simulated)
* 🟣 Show order confirmation and history

### Phase 4: Admin Panel (Learning Phase)

**Goal**: Introduce administrative functionalities for product and order management.

* 🟣 Add, update, delete products (admin only)
* 🟣 Manage orders

### Future Ideas

**Goal**: Explore and implement advanced features to enhance the user experience and platform capabilities.

* 🟣 Product reviews and ratings
* 🟣 Wishlist
* 🟣 Email notifications
* 🟣 Social media login integration

---

## Getting Started

To get a local copy of ShopEase up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB database (local installation or cloud-based service like MongoDB Atlas)

### Installation Steps

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/nnneh/ShopEase.git](https://github.com/nnneh/ShopEase.git)
    cd ShopEase
    ```

2.  **Install backend dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd client
    npm install
    ```

4.  **Configure environment variables:**
    * Create a `.env` file in the `server` directory.
    * Add necessary environment variables for your database connection and JWT secret:
        ```env
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```
    * Create a `.env.local` file in the `client` directory (for Next.js specific env vars).
    * Add your backend API URL:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:8080/api
        ```

5.  **Start the backend server:**

    ```bash
    cd server
    npm run dev
    ```

6.  **Start the frontend application:**

    ```bash
    cd client
    npm run dev
    ```

    The frontend application should now be accessible at `http://localhost:3000`.

---
