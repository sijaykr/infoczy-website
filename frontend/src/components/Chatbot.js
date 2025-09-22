import React, { useState } from 'react'; // <-- Yahaan 'axios' ki jagah 'react' hona chahiye tha
import axios from 'axios';              // <-- Axios ko alag se import karna hai
import { API_BASE_URL } from '../App';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "नमस्ते! मैं Infoczy Assistant हूँ। मैं आपकी सरकारी नौकरी या योजना खोजने में कैसे मदद कर सकता हूँ?", sender: 'bot' }]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newUserMessage = { text: userInput, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                message: userInput
            });
            
            const botMessage = { text: response.data.reply, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage = { text: "माफ़ कीजिए, कुछ तकनीकी समस्या आ गई है। कृपया थोड़ी देर बाद प्रयास करें।", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Inline styles for simplicity
    const styles = {
        chatButton: {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
        },
        chatWindow: {
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            zIndex: 1000,
        },
        chatHeader: {
            padding: '15px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
        },
        chatBody: {
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        message: (sender) => ({
            alignSelf: sender === 'bot' ? 'flex-start' : 'flex-end',
            backgroundColor: sender === 'bot' ? '#f1f1f1' : '#dcf8c6',
            padding: '10px 15px',
            borderRadius: '15px',
            maxWidth: '80%',
        }),
        chatInput: {
            display: 'flex',
            padding: '10px',
            borderTop: '1px solid #ddd',
        }
    };

    return (
        <div>
            <div style={styles.chatButton} onClick={toggleChat}>
                <i className="fas fa-comments"></i>
            </div>
            <div style={styles.chatWindow}>
                <div style={styles.chatHeader}>
                    <h4>Infoczy Assistant</h4>
                </div>
                <div style={styles.chatBody}>
                    {messages.map((msg, index) => (
                        <div key={index} style={styles.message(msg.sender)}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && <div style={styles.message('bot')}>...</div>}
                </div>
                <form onSubmit={handleSendMessage} style={styles.chatInput}>
                    <input 
                        type="text" 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="अपना सवाल पूछें..." 
                        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
                    />
                    <button type="submit" style={{ marginLeft: '10px', padding: '10px 15px' }}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;

