import React, { useState } from 'react';
import { CssBaseline, Container, Box, Typography, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const handleSend = async () => {
    if (!message) return;

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(message); // Corrected to use `message` as the prompt

      setResponse(result.response.text || "No response received"); // Adjust if `result` structure differs
      setMessage("");
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse("An error occurred while generating the response.");
    }
  };

  return (
    <Box className="app-container">
      <CssBaseline />
      <Container maxWidth="sm">
        <Box className="header">
          <Typography variant="h4" component="div" gutterBottom>
            RandomGPT
          </Typography>
        </Box>

        <Box className="chat-wrapper">
          <Typography variant="body1" className="response">
            {response || "Awaiting input..."}
          </Typography>
        </Box>

        <Box className="input-wrapper">
          <TextField
            variant="outlined"
            fullWidth
            value={message}
            placeholder="Type your message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="text-field"
          />
          <IconButton color="primary" onClick={handleSend} disabled={!message}>
            <Send />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
