import React from 'react';

const MoviesList = ({ movies }) => (
  <div className="movies-list">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <div key={movie._id} className="movie-item">
          <h3>{movie.title}</h3>
          <p><strong>Directors:</strong> {movie.directors ? movie.directors.join(', ') : 'N/A'}</p>
          <p><strong>Genres:</strong> {movie.genres ? movie.genres.join(', ') : 'N/A'}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <hr />
        </div>
      ))
    ) : (
      <p>No movies found</p>
    )}
  </div>
);

export default MoviesList;
