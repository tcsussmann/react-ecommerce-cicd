# React Firebase E-Commerce

A React e-commerce application built as part of the Coding Temple Software Development program. This project replaces the previous FakeStore API implementation with **Firebase Authentication** and **Cloud Firestore** for user and product management, shopping carts, and order history.

## Live Application

[Live React E-Commerce Application]([text](https://react-ecommerce-cicd.vercel.app/))

## Features

### User Authentication

* User registration with email and password
* User login and logout
* User profile display
* Profile address updates
* Account deletion

### Product Management

* View products stored in Firestore
* Create new products
* Edit existing products
* Delete products

### Shopping Cart

* Add products to the cart
* Track product quantities
* Remove products from the cart
* Clear the cart
* Calculate cart totals

### Order Management

* Place orders from the shopping cart
* Store orders in Firestore
* Associate orders with the logged-in user
* Store products, quantities, total price, and creation timestamp
* View previous orders
* Expand orders to view purchased products and quantities

## Technologies Used

* React
* TypeScript
* Vite
* Firebase Authentication
* Firebase Firestore
* Redux Toolkit
* React Redux
* ESLint

## Getting Started

### Prerequisites

You will need:

* Node.js
* npm
* A Firebase project with Authentication and Firestore enabled

### Installation

Clone the repository:

```bash
git clone https://github.com/tcsussmann/react-ecommerce-cicd.git
```

Navigate into the project:

```bash
cd react-ecommerce-cicd
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided by Vite in your browser.

## Firebase Configuration

This project uses Firebase Authentication and Cloud Firestore.

To run your own copy of the application, create a Firebase project and configure the Firebase SDK in:

```text
src/firebaseConfig.ts
```

Enable:

* Email/Password Authentication
* Cloud Firestore

Create the following Firestore collections:

```text
users
products
orders
```

The application creates user and order documents as part of normal use.

## Testing the Application

A basic application flow is:

1. Register a new user.
2. Log in.
3. View and update the user profile.
4. Create, edit, and delete products.
5. Add a product to the cart.
6. Place an order.
7. View the order in Order History.
8. Click an order to view its products and quantities.
9. Log out.

## Project Structure

```text
src/
├── app/
│   └── store.ts
├── features/
│   └── cart/
│       └── cartSlice.ts
├── AddProduct.tsx
├── App.tsx
├── Cart.tsx
├── DeleteAccount.tsx
├── DeleteProduct.tsx
├── EditProduct.tsx
├── Login.tsx
├── Logout.tsx
├── OrderHistory.tsx
├── Products.tsx
├── Profile.tsx
├── Register.tsx
├── firebaseConfig.ts
└── main.tsx
```

## Author

Timothy Sussmann

Coding Temple Software Development Program

## Repository

[GitHub Repository](https://github.com/tcsussmann/react-firebase-ecommerce.git)
