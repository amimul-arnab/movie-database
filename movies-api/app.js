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
                        <li>Root: <a href="https://movie-database-ch9m.onrender.com/">https://movie-database-ch9m.onrender.com/</a></li>
                        <li>Get Movies: <a href="https://movie-database-ch9m.onrender.com/movies">https://movie-database-ch9m.onrender.com/movies</a></li>
                        <li>Get Random Movie: <a href="https://movie-database-ch9m.onrender.com/movies/random">https://movie-database-ch9m.onrender.com/movies/random</a></li>
                        <li>Get Movies by ID: <a href="https://movie-database-ch9m.onrender.com/movies?_id=573a1390f29313caabcd50e5">https://movie-database-ch9m.onrender.com/movies?_id=573a1390f29313caabcd50e5</a></li>
                        <li>Get Movies by Title (e.g., Batman): <a href="https://movie-database-ch9m.onrender.com/movies?title=Batman">https://movie-database-ch9m.onrender.com/movies?title=Batman</a></li>
                        <li>Get Movies by Genre (e.g., Action): <a href="https://movie-database-ch9m.onrender.com/movies?genres=Action">https://movie-database-ch9m.onrender.com/movies?genres=Action</a></li>
                        <li>Get Movies by Cast (e.g., Keanu Reeves): <a href="https://movie-database-ch9m.onrender.com/movies?cast=Keanu%20Reeves">https://movie-database-ch9m.onrender.com/movies?cast=Keanu%20Reeves</a></li>
                        <li>Get Movies by Year (e.g., 2002): <a href="https://movie-database-ch9m.onrender.com/movies?year=2002">https://movie-database-ch9m.onrender.com/movies?year=2002</a></li>
                        <li>Get Movies by Director (e.g., Christopher Nolan): <a href="https://movie-database-ch9m.onrender.com/movies?directors=Christopher%20Nolan">https://movie-database-ch9m.onrender.com/movies?directors=Christopher%20Nolan</a></li>
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
