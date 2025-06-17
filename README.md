🛠️ Shelfy Backend – Library Management API
Welcome to the Shelfy Backend, the server-side powerhouse behind the Shelfy Library Management System. It powers secure, efficient book management, user authentication, and borrowing logic for a school library!

---

🌍 Live Server
🔗 Server Live Link

---

⚙️ Tech Stack Used
Technology          | Description
Node.js             | JavaScript runtime environment
Express.js       	| Backend framework
MongoDB 	        | NoSQL database
Mongoose            | MongoDB ODM (if used)
Firebase Admin SDK  | Token verification and security
dotenv	            | Environment variable management
CORS                | Cross-Origin Resource Sharing support

---

🔐 Authentication & Security
✅ Firebase Admin Token Verification Middleware
✅ Route protection using bearer token
✅ Role-based access for admin functionalities
✅ Sensitive data (API keys, DB credentials) secured using .env
 
 ---

📚 Main API Features
🔓 Authentication
# Token verification using Firebase Admin SDK
# Only authenticated users can access protected routes

📖 Books Management
1. GET /allBooks – Paginated book list, filter by category
2. GET /allBooks/:id – Get book by ID
3. POST /addBooks – Add a new book (auth required)
4. PATCH /updateBook/:id – Update book info (auth required)

⭐ Top Rated Books
5. GET /topRatingBooks – Get top 10 highest-rated books

📦 Borrowing System
6. GET /borrowedBooks/:email – User’s borrowed books
7. POST /addBorrowedBookInfo – Borrow a book (limit 3 books per user)
8. DELETE /deleteBorrowedBook/:id – Return a book

---

🔧 Environment Variables
Make sure to create a .env file and include the following:
# PORT=3000
# DB_USER=your_mongo_username
# DB_PASS=your_mongo_password

---

🚀 How to Run Locally
# Clone the repository
git clone https://github.com/your-username/shelfy-server.git
cd shelfy-server

# Install dependencies
npm install

# Set up environment variables
touch .env
# Add your PORT, DB_USER, DB_PASS to .env

# Run the server
node server.js

---

👨‍💻 Author
Developed by Sifad – a passionate MERN Stack Developer 🌟
📫 Feedback or suggestions? Feel free to connect or open an issue on GitHub!
