const express = require('express');
const router = express.Router();
const { verifyFbToken, verifyTokenEmail } = require('../utils/middleware');
const { 
    getAllBooks, 
    getBookById, 
    getTopRatingBooks, 
    addBook, 
    updateBook 
} = require('../controllers/booksController');

// Get all books with optional category + pagination
router.get('/allBooks', getAllBooks);

// Get a single book by Id
router.get('/allBooks/:id', getBookById);

// Get top 10 rating books by sorting
router.get('/topRatingBooks', getTopRatingBooks);

// Insert book by Post
router.post('/addBooks', verifyFbToken, verifyTokenEmail, addBook);

// Update book info by Patch
router.patch('/updateBook/:id', verifyFbToken, verifyTokenEmail, updateBook);

module.exports = router;