const { ObjectId } = require('mongodb');
const { getCollections } = require('../config/database');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { usersCollection } = await getCollections();
        const userData = req.body;
        
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists' });
        }
        
        // Add timestamp
        const userWithTimestamp = {
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await usersCollection.insertOne(userWithTimestamp);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create user' });
    }
};

// Get user by email
const getUserByEmail = async (req, res) => {
    try {
        const { usersCollection } = await getCollections();
        const { email } = req.params;
        
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch user' });
    }
};

// Update user by email
const updateUser = async (req, res) => {
    try {
        const { usersCollection } = await getCollections();
        const { email } = req.params;
        const updateData = req.body;
        
        // Add timestamp
        const updateWithTimestamp = {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        };
        
        const result = await usersCollection.updateOne(
            { email },
            updateWithTimestamp
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update user' });
    }
};

// Delete user by email
const deleteUser = async (req, res) => {
    try {
        const { usersCollection, booksCollection } = await getCollections();
        const { email } = req.params;
        
        // First, delete all books added by this user
        await booksCollection.deleteMany({ authorEmail: email });
        
        // Then, delete the user
        const result = await usersCollection.deleteOne({ email });
        
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        res.send({ message: 'User and their books deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete user' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const { usersCollection } = await getCollections();
        
        const users = await usersCollection.find().toArray();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers
};