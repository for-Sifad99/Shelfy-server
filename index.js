const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require("firebase-admin");
const { connectDB, getCollections } = require('./config/database');
const routes = require('./routes');

// Firebase Service Token Process
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decoded);

const app = express();

// CORS configuration
const corsOptions = {
    origin: ["http://localhost:5174", 'http://localhost:5173', "http://localhost:3000", 'https://shelfybook.netlify.app'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware:
app.use(cors(corsOptions));
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

        const port = process.env.PORT || 5000;
        const host = '0.0.0.0';

        app.listen(port, host, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();