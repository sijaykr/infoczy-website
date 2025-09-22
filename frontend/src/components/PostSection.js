// src/components/PostSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostSection = ({ title, posts, category, id }) => {
  const filteredPosts = posts
    .filter(post => post.category === category)
    .slice(0, 10);

  return (
    <div className="post-section" id={id}>
      <h3 className="section-title">{title}</h3>
      {filteredPosts.length > 0 ? (
        <ul className="post-list">
          {filteredPosts.map(post => (
            <li key={post._id} className="post-item">
              <Link to={`/post/${post._id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ padding: '15px' }}>No posts in this category yet.</p>
      )}
      <Link to={`/category/${encodeURIComponent(category)}`} className="view-more-btn">View More..</Link>
    </div>
  );
};

export default PostSection;