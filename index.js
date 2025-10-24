const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require("firebase-admin");
const { connectDB } = require('./config/database');
const routes = require('./routes');

// Firebase Service Token Process
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decoded);

const app = express();
const port = process.env.PORT || 3000;

// Middleware:
app.use(cors());
app.use(express.json());

// Verify Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Home route:
app.get('/', (req, res) => {
    res.send('<h1>This is cool a 📖book collection!</h1>');
});

// Use all routes
app.use('/api', routes);

// 404 route:
app.use((req, res) => {
    res.status(404).send(
        `<div style=" padding-top: 20px; text-align:center;">
        <h1 style="color: #ff735c">⚠️Page Not Found!</h1>
        <a style="color:blue;" href='/'>Back Home</a>
        </div>`
    );
});

async function startServer() {
    try {
        // Connect to database
        await connectDB();
        
        // Start server
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
