import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../App';

const AdminPage = ({ posts, onPostChange, authToken }) => {
    // Hooks must be called at the top level, before any conditionals.
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('New Update');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Now, we can safely check for the token and return early.
    if (!authToken) {
        return <Navigate to="/login" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, category, content };
        try {
            if (editingId) {
                await axios.put(`${API_BASE_URL}/api/posts/${editingId}`, postData);
            } else {
                await axios.post(`${API_BASE_URL}/api/posts`, postData);
            }
            onPostChange();
            setTitle('');
            setCategory('New Update');
            setContent('');
            setEditingId(null);
        } catch (error) {
            console.error("Failed to submit post", error);
        }
    };

    const handleEdit = (post) => {
        setEditingId(post._id);
        setTitle(post.title);
        setCategory(post.category);
        setContent(post.content);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/posts/${id}`);
                onPostChange();
            } catch (error) {
                console.error("Failed to delete post", error);
            }
        }
    };
    
    const styles = {
        container: { padding: '2rem', maxWidth: '900px', margin: 'auto' },
        form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' },
        input: { padding: '10px', fontSize: '1rem' },
        button: { padding: '10px 15px', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#004080', color: 'white', border: 'none' },
        list: { listStyle: 'none', padding: 0 },
        listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' },
        postTitle: { margin: 0 },
        actions: { display: 'flex', gap: '10px' }
    };

    return (
        <div style={styles.container}>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h3>{editingId ? 'Edit Post' : 'Create New Post'}</h3>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={styles.input} />
                <select value={category} onChange={e => setCategory(e.target.value)} required style={styles.input}>
                    <option value="New Update">New Update</option>
                    <option value="Admit Card">Admit Card</option>
                    <option value="Results">Results</option>
                    <option value="Govt Scheme">Govt Scheme</option>
                    <option value="Latest Jobs">Latest Jobs</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Syllabus">Syllabus</option>
                    <option value="Career">Career</option>
                    <option value="Admission Update">Admission Update</option>
                </select>
                <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '250px', marginBottom: '50px' }}/>
                <button type="submit" style={styles.button}>{editingId ? 'Update Post' : 'Add Post'}</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setTitle(''); setCategory('New Update'); setContent(''); }} style={{...styles.button, backgroundColor: '#6c757d'}}>Cancel Edit</button>}
            </form>

            <h2>Manage Posts</h2>
            <ul style={styles.list}>
                {posts.map(post => (
                    <li key={post._id} style={styles.listItem}>
                        <p style={styles.postTitle}>{post.title}</p>
                        <div style={styles.actions}>
                            <button onClick={() => handleEdit(post)} style={{...styles.button, backgroundColor: '#17a2b8'}}>Edit</button>
                            <button onClick={() => handleDelete(post._id)} style={{...styles.button, backgroundColor: '#dc3545'}}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;

