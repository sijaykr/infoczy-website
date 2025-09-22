// src/components/CategoryPage.js - UPDATED

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the new sidebar
import { API_BASE_URL } from '../App'; // <-- Import

const CategoryPage = ({ posts }) => { // Accept all posts as a prop
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();

 useEffect(() => {
    const fetchCategoryPosts = async () => {
      setLoading(true);
      try {
        // Use API_BASE_URL here
        const res = await axios.get(`${API_BASE_URL}/api/posts/category/${categoryName}`);
        setCategoryPosts(res.data);
      } catch (error) {
        console.error("Error fetching category posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [categoryName]);
  return (
    <main className="container">
       <div className="page-container">
        <div className="main-content-area">
            <h2 className="section-title">{decodeURIComponent(categoryName)}</h2>
            {loading ? (
            <p style={{padding: '20px'}}>Loading posts...</p>
            ) : categoryPosts.length > 0 ? (
            <ul className="post-list">
                {categoryPosts.map(post => (
                <li key={post._id} className="post-item">
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                </li>
                ))}
            </ul>
            ) : (
            <p style={{padding: '20px'}}>No posts found in this category.</p>
            )}
        </div>
        <Sidebar posts={posts} />
      </div>
    </main>
  );
};

export default CategoryPage;