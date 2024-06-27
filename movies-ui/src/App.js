import React, { useState } from 'react';
import './index.css';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('title');
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const fetchMovies = async (filter, query) => {
    try {
      console.log(`Fetching movies with filter: ${filter} and query: ${query}`);
      const response = await fetch(`https://movie-database-six-chi.vercel.app/movies?${filter}=${query}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched movies:', data);
        setMovies(data);
        setShowResults(true);
      } else {
        console.error('Error fetching movies:', response.status);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const generateRandomMovie = async () => {
    try {
      console.log('Generating random movie');
      const response = await fetch(`https://movie-database-six-chi.vercel.app/movies/random`);
      if (response.ok) {
        const data = await response.json();
        console.log('Generated random movie:', data);
        setMovies([data]);
        setShowResults(true);
      } else {
        console.error('Error generating random movie:', response.status);
      }
    } catch (error) {
      console.error('Error generating random movie:', error);
    }
  };

  const addMovie = async (movie) => {
    try {
      console.log('Adding movie:', movie);
      const response = await fetch(`https://movie-database-six-chi.vercel.app/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Added movie:', data);
        setMovies((prevMovies) => [...prevMovies, data]);
      } else {
        console.error('Error adding movie:', response.status);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="main-container">
      <header className="header">
        <img src="/assets/movie.png" alt="Movie Database Logo" />
        <div>
          <h1>MOVIE DATABASE</h1>
          <p>By Amimul Arnab</p>
        </div>
      </header>
      <div className="intro">
        <p>
          Welcome! This application uses a RESTful API to fetch data from the sample Mflix database from MongoDB. Not all movies can be found, but you can add movies using the feature below. Feel free to search and use filters to find movies by category.
        </p>
      </div>
      <div className="content">
        <div className="search-container">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder={`Search movie by ${filter}`}
              className="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  fetchMovies(filter, query);
                }
              }}
            />
            <button className="search-button" onClick={() => fetchMovies(filter, query)}>Search</button>
          </div>
          <div className="button-group">
            <select className="filter-dropdown" value={filter} onChange={handleFilterChange}>
              <option value="title">Title</option>
              <option value="directors">Directors</option>
              <option value="genres">Genres</option>
              <option value="year">Year</option>
            </select>
            <button className="generate-button" onClick={generateRandomMovie}>Generate Random</button>
          </div>
        </div>
        {showResults && (
          <div className="search-results-container active">
            <h2 className="results-heading">Search Results</h2>
            <MoviesList movies={movies} />
          </div>
        )}
        <div className="add-movie-container">
          <h2>Add a Movie</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const movie = {
                title: form.title.value,
                directors: form.directors.value.split(',').map(director => director.trim()),
                genres: form.genres.value.split(',').map(genre => genre.trim()),
                year: parseInt(form.year.value),
                fullplot: form.fullplot.value,
              };
              addMovie(movie);
              form.reset();
            }}
          >
            <input type="text" id="title" name="title" placeholder="Title" required />
            <input type="text" id="directors" name="directors" placeholder="Directors (comma separated)" required />
            <input type="text" id="genres" name="genres" placeholder="Genres (comma separated)" required />
            <input type="number" id="year" name="year" placeholder="Year" required />
            <input type="text" id="fullplot" name="fullplot" placeholder="Description" required />
            <button type="submit" className="add-button">ADD MOVIE</button>
          </form>
        </div>
        <div className="tech-container">
          <h3>This application is made with</h3>
          <div className="tech-logos">
            <img src="/assets/reactjs.png" alt="ReactJS" />
            <img src="/assets/nodejs.png" alt="NodeJS" />
            <img src="/assets/mongodb.png" alt="MongoDB" />
            <img src="/assets/restapi.png" alt="REST API" />
          </div>
        </div>
        <footer>
          <p>Media Queries used in this project:</p>
          <p>@media (max-width: 768px) </p>
          <p>Created by Amimul Arnab</p>
          <div className="github-icon">
            <a href="https://github.com/amimul-arnab/movie-database" target="_blank" rel="noopener noreferrer">
              <img src="/assets/github.png" alt="GitHub" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
