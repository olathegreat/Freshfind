import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import data from '../data/freshfindData.json';
import './Chatbot.css';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const { greeting, quickReplies, responses } = data.chatbotLogic;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: greeting, sender: 'bot' }]);
    }
  }, [isOpen, greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');

    // Simulate bot typing delay
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse = responses.default;

      // Simple keyword matching logic based on SRS
      if (lowerText.includes('tomato')) {
        botResponse = responses.tomatoes;
      } else if (lowerText.includes('open today') || lowerText.includes('open now')) {
        botResponse = responses.open_today;
      } else if (lowerText.includes('market') || lowerText.includes('find')) {
        botResponse = "I can help you find markets! Check out our Market Directory page to filter by location, day, or produce.";
      } else if (lowerText.includes('season')) {
        botResponse = "You can view seasonal produce on our Seasonal Picks page.";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-window animate-fade-up">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <FaRobot />
          <span>FreshFind Assistant</span>
        </div>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-quick-replies">
        {quickReplies.map((reply, index) => (
          <button key={index} className="quick-reply-btn" onClick={() => handleSend(reply)}>
            {reply}
          </button>
        ))}
      </div>

      <div className="chatbot-input">
        <input 
          type="text" 
          placeholder="Type your question..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
        />
        <button onClick={() => handleSend(inputValue)}><FaPaperPlane /></button>
      </div>
    </div>
  );
};

export default Chatbot;