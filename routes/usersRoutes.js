const express = require('express');
const router = express.Router();
const { verifyFbToken, verifyTokenEmail } = require('../utils/middleware');
const { 
    createUser, 
    getUserByEmail, 
    updateUser, 
    deleteUser,
    getAllUsers
} = require('../controllers/usersController');

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users', getAllUsers);

// Get user by email
router.get('/users/:email', getUserByEmail);

// Update user by email
router.patch('/users/:email', verifyFbToken, verifyTokenEmail, updateUser);

// Delete user by email
router.delete('/users/:email', verifyFbToken, verifyTokenEmail, deleteUser);

module.exports = router;