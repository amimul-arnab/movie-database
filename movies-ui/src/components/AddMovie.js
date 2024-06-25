import React, { useState } from 'react';

const AddMovie = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, director, genre, year });
    setTitle('');
    setDirector('');
    setGenre('');
    setYear('');
  };

  return (
    <div className="add-movie-container main-container">
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Director" required />
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
        <button type="submit">ADD MOVIE</button>
      </form>
    </div>
  );
};

export default AddMovie;
