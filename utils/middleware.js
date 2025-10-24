const admin = require("firebase-admin");

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

module.exports = {
    verifyFbToken,
    verifyTokenEmail
};