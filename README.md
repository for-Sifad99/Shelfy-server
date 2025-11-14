# 📚 ShelfyBook Server — Backend API

ShelfyBook Server is the backend API for the ShelfyBook Library Management System with RESTful endpoints for books, users, and borrowing operations.

---

## 🔥 Key Features

✅ RESTful API with organized routes and controllers  
✅ MongoDB integration for data persistence  
✅ Firebase Admin for secure authentication  
✅ JWT Token verification for protected routes  

---

## 🚀 Technologies

- Node.js, Express.js, MongoDB
- Firebase Admin SDK
- CORS, Dotenv

---

## 🗂 API Endpoints

### Books Routes (`/api`)
- `POST /addBooks` - Add a new book
- `PATCH /updateBook/:id` - Update a book by ID
- `GET /allBooks` - Get all books with pagination
- `GET /allBooks/:id` - Get a single book by ID
- `DELETE /deleteBook/:id` - Delete a book by ID

### Borrowed Books Routes (`/api`)
- `POST /addBorrowedBookInfo` - Add borrowed book information
- `GET /borrowedBooks/:email` - Get borrowed books by user email
- `DELETE /deleteBorrowedBook/:id` - Return a borrowed book

### Users Routes (`/api`)
- `POST /users` - Create a new user
- `GET /users` - Get all users (admin only)
- `GET /users/:email` - Get user by email
- `PATCH /users/:email` - Update user by email

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

## 🪶 Notes

Server deployed at: https://shelfy-book-server.vercel.app