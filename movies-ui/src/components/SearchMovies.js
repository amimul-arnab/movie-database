import React, { useState } from 'react';

const SearchMovies = ({ onSearch }) => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ title, director, genre, year });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Search Movies</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Director:</label>
      <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} />
      <label>Genre:</label>
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <label>Year:</label>
      <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      <button type="submit">Search Movies</button>
    </form>
  );
};

export default SearchMovies;
