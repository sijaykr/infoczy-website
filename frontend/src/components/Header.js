// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // <-- 1. IMPORT IT

const Header = () => {
  return (
    <header className="app-header">
      <div className="top-bar">
        <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>infoczy</Link></h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/category/Govt%20Scheme">Govt Scheme</Link></li>
          <li><Link to="/category/Admit%20Card">Admit Card</Link></li>
          <li><Link to="/category/Career">Career</Link></li>
          <li><Link to="/category/Scholarship">Scholarship</Link></li>
          <li><Link to="/category/Syllabus">Syllabus</Link></li>
          <li><Link to="/category/Results">Results</Link></li>
        </ul>
          </nav>
                <SearchBar /> {/* <-- 2. ADD IT HERE */}

    </header>
  );
};

export default Header;