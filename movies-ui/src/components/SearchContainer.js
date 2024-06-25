import React, { useState } from 'react';

const SearchContainer = ({ onSearch, onRandom }) => {
  const [filter, setFilter] = useState('title');
  const [query, setQuery] = useState('');

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filter, query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-input-group">
        <input type="text" value={query} onChange={handleQueryChange} placeholder={`Search movie by ${filter}`} />
        <button type="submit">Search</button>
      </form>
      <div className="button-group">
        <select value={filter} onChange={handleFilterChange} className="filter-dropdown">
          <option value="title">Title</option>
          <option value="director">Director</option>
          <option value="genre">Genre</option>
          <option value="year">Year</option>
        </select>
        <button onClick={onRandom}>Generate Random</button>
      </div>
    </div>
  );
};

export default SearchContainer;
