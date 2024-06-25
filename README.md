
# Movie Database

Welcome to the Movie Database! This project is a web application that allows users to search for movies, add new movies, and view random movies using a RESTful API with data fetched from the sample Mflix database from MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Media Queries](#media-queries)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This application uses a RESTful API to fetch data from the sample Mflix database from MongoDB. Users can search for movies by title, director, genre, or year, add new movies, and generate random movies.

## Features

- Search movies by title, director, genre, or year
- Add new movies to the database
- Generate random movies
- Responsive design for mobile and desktop views

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **CSS**: Custom CSS with media queries for responsiveness

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account with the sample Mflix database loaded

### Backend Setup

1. Clone the repository:
    \`\`\`sh
    git clone https://github.com/amimul-arnab/movie-database.git
    cd movie-database/movies-api
    \`\`\`

2. Install backend dependencies:
    \`\`\`sh
    npm install
    \`\`\`

3. Create a \`.env\` file in the \`movies-api\` directory and add your MongoDB URI:
    \`\`\`env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
    \`\`\`

4. Start the backend server:
    \`\`\`sh
    node app.js
    \`\`\`

### Frontend Setup

1. Navigate to the \`movies-ui\` directory:
    \`\`\`sh
    cd ../movies-ui
    \`\`\`

2. Install frontend dependencies:
    \`\`\`sh
    npm install
    \`\`\`

3. Start the frontend development server:
    \`\`\`sh
    npm start
    \`\`\`

## Usage

- **Search for Movies**: Use the search bar to find movies by title, director, genre, or year.
- **Add a Movie**: Fill in the form to add a new movie to the database.
- **Generate Random Movie**: Click the "Generate Random" button to fetch a random movie from the database.

## API Endpoints

### GET /movies

Fetch movies based on query parameters.

- **Query Parameters**:
  - \`title\` (string): Movie title
  - \`director\` (string): Movie director
  - \`genre\` (string): Movie genre
  - \`year\` (number): Movie release year

- **Response**:
  \`\`\`json
  [
    {
      "_id": "string",
      "title": "string",
      "directors": ["string"],
      "genres": ["string"],
      "year": number
    }
  ]
  \`\`\`

### GET /movies/random

Fetch a random movie from the database.

- **Response**:
  \`\`\`json
  {
    "_id": "string",
    "title": "string",
    "directors": ["string"],
    "genres": ["string"],
    "year": number
  }
  \`\`\`

### POST /movies

Add a new movie to the database.

- **Request Body**:
  \`\`\`json
  {
    "title": "string",
    "directors": ["string"],
    "genres": ["string"],
    "year": number
  }
  \`\`\`

- **Response**:
  \`\`\`json
  {
    "_id": "string",
    "title": "string",
    "directors": ["string"],
    "genres": ["string"],
    "year": number
  }
  \`\`\`

## Media Queries

The application includes the following media query to ensure responsiveness:

\`\`\`css
@media (max-width: 768px) {
  .search-bar-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    margin-bottom: 10px;
  }

  .button-group {
    flex-direction: column;
  }

  .filter-dropdown {
    margin-bottom: 10px;
  }

  .tech-logos img {
    width: 60px;
    height: 60px;
  }
}
\`\`\`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
