// src/components/SearchBar.js - FINAL VERSION

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <div className="header-search-container">
        <div className="search-widget">
            <form onSubmit={handleSearch}>
                <input 
                type="text" 
                placeholder="Search Jobs, admit card etc..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    </div>
  );
};

export default SearchBar;