// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

// We can reuse the PostSection component, but a simpler version is better here
const SidebarSection = ({ title, posts, category }) => {
    const filteredPosts = posts.filter(p => p.category === category).slice(0, 5); // Show 5 posts
    return (
        <div className="sidebar-widget">
            <h4 className="sidebar-title">{title}</h4>
            {filteredPosts.length > 0 ? (
                <ul className="sidebar-post-list">
                    {filteredPosts.map(post => (
                        <li key={post._id} className="sidebar-post-item">
                            <Link to={`/post/${post._id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : <p>No posts yet.</p>}
        </div>
    )
}


const Sidebar = ({ posts }) => {
  return (
      <aside className="sidebar-area">
      <div className="sidebar-widget social-join">
        <h4 className="sidebar-title">Join Our Group</h4>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp"><i className="fab fa-whatsapp"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon telegram"><i className="fab fa-telegram-plane"></i></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon youtube"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      
      <SidebarSection title="Latest Update" posts={posts} category="New Update" />
      <SidebarSection title="Latest Jobs" posts={posts} category="Latest Jobs" />

    </aside>
  );
};

export default Sidebar;