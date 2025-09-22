const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// NOTE: Aapko Google AI Studio se API Key leni hogi aur use .env file me dalna hoga
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Gemini AI Model chunein
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash-preview-05-20",
            // Yah system prompt AI ko batata hai ki use kya karna hai
            systemInstruction: "You are 'Infoczy Assistant', a helpful and friendly expert on government jobs, exams, results, and schemes in India. Your primary goal is to provide accurate, up-to-date, and concise information to users. Always use Google Search to find the latest information before answering. If you don't know the answer, say so. Keep your answers in simple Hindi (written in Latin script).",
            // Yah Google Search tool ko enable karta hai
            tools: [{ "google_search": {} }],
        });

        const chat = model.startChat();
        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        
        // Extract the AI's generated text
        const botReply = response.text();

        res.json({ reply: botReply });

    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).send("AI server mein kuch gadbad hai.");
    }
});

module.exports = router;