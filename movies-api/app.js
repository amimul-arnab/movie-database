require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('Error: MONGODB_URI is not set in .env file');
    process.exit(1);
}

const client = new MongoClient(uri, {
    ssl: true
});

let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db("sample_mflix");

        defineRoutes();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

function defineRoutes() {
    const moviesCollection = () => db.collection('movies');

    app.get('/', (req, res) => {
        res.send('Successfully connected to MongoDB!');
    });

    app.get('/movies', async (req, res) => {
        const { title, directors, genres, year } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' };
        if (directors) query.directors = { $regex: directors, $options: 'i' };
        if (genres) query.genres = { $regex: genres, $options: 'i' };
        if (year) query.year = parseInt(year);

        try {
            const movies = await moviesCollection().find(query).limit(10).toArray();
            res.json(movies);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.get('/movies/random', async (req, res) => {
        try {
            const moviesCount = await moviesCollection().countDocuments();
            const randomIndex = Math.floor(Math.random() * moviesCount);
            const randomMovie = await moviesCollection().find().skip(randomIndex).limit(1).toArray();
            res.json(randomMovie[0]);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.post('/movies', async (req, res) => {
        const newMovie = req.body;

        try {
            await moviesCollection().insertOne(newMovie);
            res.status(201).json(newMovie);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    const port = process.env.PORT || 3000;
    console.log(`Starting server on port: ${port}`); // Add this line for debugging
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

connectToMongoDB().catch(console.dir);
