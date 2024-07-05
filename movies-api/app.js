require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
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
        res.send(`
            <html>
                <body>
                    <h1>Successfully connected to MongoDB!</h1>
                    <p>To test the API endpoints, you can go on <a href="https://www.postman.com/">Postman</a> and test the following:</p>
                    <ul>
                        <li>Root: <a href="http://localhost:3000/">http://localhost:3000/</a></li>
                        <li>Get Movies: <a href="http://localhost:3000/movies">http://localhost:3000/movies</a></li>
                        <li>Get Random Movie: <a href="http://localhost:3000/movies/random">http://localhost:3000/movies/random</a></li>
                    </ul>
                </body>
            </html>
        `);
    });

    app.get('/movies', async (req, res) => {
        const query = {};

        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                if (key === '_id') {
                    query[key] = new ObjectId(req.query[key]);
                } else {
                    query[key] = { $regex: req.query[key], $options: 'i' };
                }
            }
        }

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
    console.log(`Starting server on port: ${port}`);
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

connectToMongoDB().catch(console.dir);
