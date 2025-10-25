const admin = require("firebase-admin");
const { getCollections } = require("../config/database");

// Verify Firebase Token
const verifyFbToken = async (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Unauthorized access!!' })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized access!!' })
    };
};

// Check if decoded email exists
const verifyTokenEmail = async (req, res, next) => {
    if (!req.decoded?.email) {
        return res.status(403).send({ message: 'Forbidden access!' });
    };
    next();
}

// Check if user is admin
const verifyAdmin = async (req, res, next) => {
    const { usersCollection } = await getCollections();
    const email = req.decoded?.email;
    
    if (!email) {
        return res.status(403).send({ message: 'Forbidden access!' });
    }
    
    try {
        const user = await usersCollection.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.status(403).send({ message: 'Forbidden access! Admins only.' });
        }
        next();
    } catch (error) {
        return res.status(500).send({ message: 'Server error while verifying admin status' });
    }
}

module.exports = {
    verifyFbToken,
    verifyTokenEmail,
    verifyAdmin
};