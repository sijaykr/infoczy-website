import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../App'; // <-- Ise import karein

const LoginPage = ({ setAuthToken }) => {
    // ... (state variables yaha rahenge)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Yaha localhost ko badlein
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
            setAuthToken(res.data.token);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };
    // ... (return statement waisa hi rahega)
    return (
        <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
