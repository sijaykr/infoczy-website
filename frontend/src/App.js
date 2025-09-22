import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SinglePostPage from './components/SinglePostPage';
import CategoryPage from './components/CategoryPage';
import SearchResultsPage from './components/SearchResultsPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import './App.css';

// This is the universal API URL that will be imported by other components.
// It automatically switches between your local server and your live server.
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [posts, setPosts] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const setToken = (token) => {
      if (token) {
          localStorage.setItem('token', token);
          axios.defaults.headers.common['x-auth-token'] = token;
      } else {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
      }
      setAuthToken(token);
  }

  const fetchPosts = async () => {
    
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
      if (authToken) {
          axios.defaults.headers.common['x-auth-token'] = authToken;
      }
      fetchPosts();
  }, [authToken]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/post/:id" element={<SinglePostPage posts={posts} />} />
          <Route path="/category/:categoryName" element={<CategoryPage posts={posts} />} />
          <Route path="/search" element={<SearchResultsPage posts={posts} />} />
          <Route path="/login" element={<LoginPage setAuthToken={setToken} />} />
          <Route path="/admin" element={<AdminPage posts={posts} onPostChange={fetchPosts} authToken={authToken} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



