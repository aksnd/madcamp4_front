// src/App.js

import React, { useState } from 'react';
import './App.css';

function MainPage() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleGetRequest = () => {
    fetch(`http://52.78.53.98:8000/simple-text/${inputValue}/`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>Message from Django API</h1>
      
      <input 
        type="text" 
        value={inputValue} 
        onChange={e => setInputValue(e.target.value)} 
        placeholder="Enter a value" 
      />
      <button onClick={handleGetRequest}>Send GET Request</button>
      <p>{message}</p>
    </div>
  );
}

export default MainPage;