# 📚 ShelfyBook Server — Backend API

ShelfyBook Server is the robust backend API for the ShelfyBook Library Management System, providing RESTful endpoints for books, users, and borrowing operations with secure authentication and data persistence.

---

## 🎯 Project Overview

The ShelfyBook Server is built with Node.js and Express.js, providing a secure and scalable backend for the library management system. It handles all data operations, user authentication, and business logic for the application.

### Key Features

- **RESTful API**: Well-organized routes and controllers following REST principles
- **MongoDB Integration**: Robust data persistence with MongoDB for books, users, and borrowing records
- **Firebase Admin**: Secure authentication using Firebase Admin SDK
- **JWT Token Verification**: Protected routes with JWT token verification for enhanced security
- **Role-based Access Control**: Different permission levels for users and administrators
- **Data Validation**: Comprehensive input validation and error handling
- **Pagination**: Efficient data retrieval with pagination support
- **CORS Support**: Cross-origin resource sharing configuration for frontend integration

---

## 🚀 Technologies

- Node.js, Express.js, MongoDB
- Firebase Admin SDK
- CORS, Dotenv
- MongoDB Driver for database operations

---

## 🗂 API Endpoints

### Books Routes (`/api`)
- `POST /addBooks` - Add a new book (authenticated users)
- `PATCH /updateBook/:id` - Update a book by ID (authenticated users)
- `GET /allBooks` - Get all books with pagination and optional category filtering
- `GET /allBooks/:id` - Get a single book by ID
- `GET /myBooks/:email` - Get books added by a specific user (authenticated users)
- `GET /topRatingBooks` - Get top 10 rated books
- `GET /booksStatistics` - Get statistics for admin dashboard
- `GET /topUsersByBooks` - Get top users by number of books added
- `DELETE /deleteBook/:id` - Delete a book by ID (authenticated users)

### Borrowed Books Routes (`/api`)
- `POST /addBorrowedBookInfo` - Add borrowed book information
- `GET /borrowedBooks/:email` - Get borrowed books by user email
- `GET /borrowedBooksInfo` - Get all borrowed books information (admin only)
- `DELETE /deleteBorrowedBook/:id` - Return a borrowed book

### Users Routes (`/api`)
- `POST /users` - Create a new user (no authentication required)
- `GET /users` - Get all users (admin only)
- `GET /users/:email` - Get user by email (authenticated users)
- `PATCH /users/:email` - Update user by email (authenticated users)
- `DELETE /users/:email` - Delete user by email (admin only)

---

## 🛠 Installation

1. Clone the repo
2. Navigate to project directory
3. Install dependencies: `npm install`
4. Create `.env` file with your configuration
5. Start server: `npm start`

---

## ⚙️ Environment Variables

Create `.env` file:

```env
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
FB_SERVICE_KEY=your_base64_encoded_firebase_service_key
PORT=3000
```

---

## 🔐 Authentication

The API uses Firebase Authentication for user verification. Most endpoints require authentication, which is handled through middleware:

- `verifyFbToken`: Verifies Firebase ID token
- `verifyTokenEmail`: Ensures email exists in the token
- `verifyAdmin`: Verifies if the user has admin privileges

---

## 🏗️ Project Structure

```
.
├── config/              # Database configuration
├── controllers/         # Business logic for different entities
├── routes/              # API route definitions
├── utils/               # Utility functions and middleware
├── index.js             # Main server file
└── .env                 # Environment variables
```

---

## 🪶 Notes

Server deployed at: https://shelfy-book-server.vercel.app