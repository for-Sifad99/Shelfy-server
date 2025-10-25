# 📚 ShelfyBook Server — Backend API

ShelfyBook Server is the backend API for the ShelfyBook Library Management System. It provides RESTful endpoints for managing books, users, and borrowing operations with secure authentication and real-time notifications.

---

## 🔥 Features

✅ **RESTful API** with organized routes and controllers  
✅ **MongoDB** integration for data persistence  
✅ **Firebase Admin** for secure authentication verification  
✅ **Socket.IO** for real-time notifications to admin users  
✅ **JWT Token** verification for protected routes  
✅ **CORS** configuration for secure cross-origin requests  
✅ **Environment variables** for secure configuration  
✅ **Modular architecture** with MVC pattern  

---

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Firebase Admin SDK**
- **Socket.IO**
- **CORS**
- **Dotenv**

---

## 🗂 API Endpoints

### Books Routes (`/api`)
- `POST /addBooks` - Add a new book
- `PATCH /updateBook/:id` - Update a book by ID
- `GET /allBooks` - Get all books with pagination
- `GET /allBooks/:id` - Get a single book by ID
- `DELETE /deleteBook/:id` - Delete a book by ID
- `GET /topRatingBooks` - Get top-rated books
- `GET /booksStatistics` - Get books statistics for admin dashboard

### Borrowed Books Routes (`/api`)
- `POST /addBorrowedBookInfo` - Add borrowed book information
- `GET /borrowedBooks/:email` - Get borrowed books by user email
- `DELETE /deleteBorrowedBook/:id` - Return a borrowed book
- `GET /borrowedBooksInfo` - Get all borrowed books info (admin only)
- `GET /topUsersByBooks` - Get top users by books added

### Users Routes (`/api`)
- `POST /users` - Create a new user
- `GET /users` - Get all users (admin only)
- `GET /users/:email` - Get user by email
- `PATCH /users/:email` - Update user by email
- `DELETE /users/:email` - Delete user by email (admin only)

---

## 🔐 Authentication & Authorization

- **Firebase JWT Token** verification for all protected routes
- **Email verification** middleware to ensure token matches user
- **Admin verification** middleware for admin-only routes
- **Socket.IO** authentication for real-time notifications

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# 🔹 MongoDB Configuration
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password

# 🔹 Firebase Service Account Key (Base64 encoded)
FB_SERVICE_KEY=your_base64_encoded_firebase_service_key

# 🔹 Server Port
PORT=3000
```

---

## 🛠 Installation & Setup

1. Clone the server repo
   ```bash
   git clone https://github.com/for-Sifad99/Shelfy-server.git
   ```

2. Navigate to the project directory
   ```bash
   cd shelfy-book-server
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Create a `.env` file with your configuration (see above)

5. Start the development server
   ```bash
   npm start
   ```

---

## 🧪 Testing the API

You can test the API endpoints using tools like Postman or curl:

```bash
# Example: Get all books
curl http://localhost:3000/api/allBooks

# Example: Get user by email (requires authentication)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/api/users/user@example.com
```

---

## 🔮 Future Updates

This backend API is designed to be scalable and maintainable. Future updates may include:
- Enhanced caching mechanisms
- Advanced analytics and reporting
- Improved error handling and logging
- Additional security measures
- Performance optimizations

---

## 👤 Admin Credentials

For testing purposes, you can use the following admin credentials:

**Email:** sifayed99@gmail.com  
**Password:** @Admin99

---

## 🪶 Notes

This server is built with security and scalability in mind. All routes are properly protected with authentication middleware, and sensitive information is stored in environment variables.