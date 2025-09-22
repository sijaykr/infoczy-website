// src/components/SinglePostPage.js - FINAL VERSION

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { API_BASE_URL } from '../App'; // <-- Import
import { Helmet } from 'react-helmet-async'; // <-- 1. Helmet को इम्पोर्ट करें

const SinglePostPage = ({ posts }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

   useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Use API_BASE_URL here
        const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching single post", error);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);
    fetchPost();
  }, [id]);

  // Find related posts (from the same category, but not the current post)
  const relatedPosts = post 
    ? posts.filter(p => p.category === post.category && p._id !== post._id).slice(0, 3)
    : [];

  if (loading) {
    return <div className="container" style={{padding: '2rem'}}>Loading...</div>;
  }

  if (!post) {
    return <div className="container" style={{padding: '2rem'}}>Post not found. <Link to="/">Go back home</Link></div>;
  }
  const description = post.content.replace(/<[^>]*>?/gm, '').substring(0, 155);

  return (
    <main className="container">
        <Helmet>
        <title>{`${post.title} - Infoczy`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="page-container">
        <div className="main-content-area">
          <h1 className="section-title">{post.title}</h1>
          <div className="post-meta">
            <span>Posted on: {new Date(post.postDate).toLocaleDateString()}</span>
          </div>
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
        <Sidebar posts={posts} />
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
          <div className="related-posts-section">
              <h2 className="section-title">Related Posts</h2>
              <div className="related-posts-grid">
                  {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost._id} to={`/post/${relatedPost._id}`} className="related-post-card">
                          {/* You can add images to your schema later for this part */}
                          <img src="https://via.placeholder.com/300x150.png?text=Related+Post" alt={relatedPost.title} />
                          <h4>{relatedPost.title}</h4>
                      </Link>
                  ))}
              </div>
          </div>
      )}
    </main>
  );
};

export default SinglePostPage;