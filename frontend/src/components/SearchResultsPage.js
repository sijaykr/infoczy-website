// src/components/SearchResultsPage.js - NEW FILE

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { API_BASE_URL } from '../App'; // <-- Import

// A custom hook to easily get URL query parameters
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = ({ posts }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = useQuery().get('q');

    useEffect(() => {
        if (!query) return;
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                // Use API_BASE_URL here
                const res = await axios.get(`${API_BASE_URL}/api/posts/search?q=${query}`);
                setSearchResults(res.data);
            } catch (error) {
                console.error("Error fetching search results", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query]);
    return (
        <main className="container">
            <div className="page-container">
                <div className="main-content-area">
                    <h2 className="section-title">Search Results for: "{query}"</h2>
                    {loading ? (
                        <p style={{padding: '20px'}}>Searching...</p>
                    ) : searchResults.length > 0 ? (
                        <ul className="post-list">
                            {searchResults.map(post => (
                                <li key={post._id} className="post-item">
                                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{padding: '20px'}}>No posts found matching your search.</p>
                    )}
                </div>
                <Sidebar posts={posts} />
            </div>
        </main>
    );
};

export default SearchResultsPage;