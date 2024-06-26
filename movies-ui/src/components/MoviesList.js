import React from 'react';

const MoviesList = ({ movies }) => {
  console.log('Rendering MoviesList with movies:', movies);

  return (
    <div className="search-results-container active">
      {movies.length > 0 ? (
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-item">
              <h3>Title: {movie.title}</h3>
              <p><strong>Directors:</strong> {movie.directors ? movie.directors.join(', ') : 'N/A'}</p>
              <p><strong>Genres:</strong> {movie.genres ? movie.genres.join(', ') : 'N/A'}</p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Description:</strong> {movie.fullplot ? movie.fullplot : 'N/A'}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default MoviesList;
