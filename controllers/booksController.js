const { ObjectId } = require('mongodb');
const { getCollections } = require('../config/database');

// Get all books with optional category + pagination
const getAllBooks = async (req, res) => {
    try {
        const { booksCollection } = await getCollections();
        const category = req.query.category;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        // Query Setup
        const query = {};
        if (category) {
            query.category = category;
        };

        const skip = (page - 1) * limit;
        const totalBooks = await booksCollection.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / limit);

        const books = await booksCollection
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray();

        res.send({
            books,
            totalBooks,
            totalPages,
            currentPage: page
        });

    } catch (err) {
        res.status(500).send({ message: "Server error" });
    };
};

// Get a single book by Id
const getBookById = async (req, res) => {
    try {
        const { booksCollection } = await getCollections();
        const id = req.params.id;

        const book = await booksCollection.findOne({ _id: new ObjectId(id) });
        res.send(book);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch book' });
    };
};

// Get top 10 rating books by sorting
const getTopRatingBooks = async (req, res) => {
    try {
        const { booksCollection } = await getCollections();
        
        const books = await booksCollection
            .find()
            .sort({ rating: -1 })
            .limit(10)
            .toArray();

        res.send(books);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch top rating books' });
    };
};

// Insert book by Post
const addBook = async (req, res) => {
    try {
        const { booksCollection } = await getCollections();
        const book = req.body;

        const newBook = await booksCollection.insertOne(book);
        res.send(newBook);
    } catch (error) {
        res.status(500).send({ error: "Failed to add book" });
    };
};

// Update book info by Patch
const updateBook = async (req, res) => {
    try {
        const { booksCollection } = await getCollections();
        const id = req.params.id;
        const updatedBook = req.body;

        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
            $set: {
                ...updatedBook,
            }
        };

        const result = await booksCollection.updateOne(filter, updatedDoc);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Failed to update book" });
    };
};

module.exports = {
    getAllBooks,
    getBookById,
    getTopRatingBooks,
    addBook,
    updateBook
};