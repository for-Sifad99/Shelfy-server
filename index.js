const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware:
app.use(cors());
app.use(express.json());

// Home route:
app.get('/', (req, res) => {
    res.send('<h1>This is cool a 📖book collection!</h1>');
});

// URI:
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1etiuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Create jobsCollection:
        const booksCollection = client.db('books-library').collection('books');

        // Get all books
        app.get('/allBooks', async (req, res) => {

            const allBooks = await booksCollection.find().toArray();
            res.send(allBooks);
        });

        // Get a single book by Id
        app.get('/allBooks/:id', async (req, res) => {
            const id = req.params.id;

            try {
                const book = await booksCollection.findOne({ _id: new ObjectId(id) });
                res.send(book);
            } catch (error) {
                res.status(500).send({ error: 'Failed to fetch book' });
            };
        });

        // Insert book by Post
        app.post('/addBooks', async (req, res) => {
            const book = req.body;

            const newBook = await booksCollection.insertOne(book);
            res.send(newBook);
        });

        // Update book info by Patch
        app.patch('/updateBook/:id', async (req, res) => {
            const id = req.params.id;
            const updatedBook = req.body;

            try {
                const filter = { _id: new ObjectId(id) };
                const updatedDoc = {
                    $set: updatedBook
                };

                const result = await booksCollection.updateOne(filter, updatedDoc);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: "Failed to update book" });
            };
        });

        // 404 route:
        app.use((req, res) => {
            res.status(404).send(
                `<div style=" padding-top: 20px; text-align:center;">
        <h1 style="color: #ff735c">⚠️Page Not Found!</h1>
        <a style="color:blue;" href='/'>Back Home</a>
        </div>`
            );
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("✅ Connected to MongoDB!");

        // Start server
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    };
}
run().catch(console.dir);

