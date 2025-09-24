import React, { useState } from 'react';

// 👇 This is your decision tree
const chatFlow = {
  start: {
    text: 'Hi! How can I help you today?',
    options: [
      { label: 'Track Order', next: 'track' },
      { label: 'Talk to Agent', next: 'agent' },
      { label: 'Product Info', next: 'product' }
    ]
  },
  track: {
    text: 'Please enter your order ID. (This is a static response)',
    options: [{ label: 'Start Over', next: 'start' }]
  },
  agent: {
    text: 'Connecting you to a human agent... Please wait.',
    options: [{ label: 'Start Over', next: 'start' }]
  },
  product: {
    text: 'Which product are you interested in?',
    options: [
      { label: 'Phones', next: 'phones' },
      { label: 'Laptops', next: 'laptops' },
      { label: 'Accessories', next: 'accessories' }
    ]
  },
  phones: {
    text: 'We have the latest iPhones and Androids.',
    options: [{ label: 'Start Over', next: 'start' }]
  },
  laptops: {
    text: 'We offer MacBooks, Dell, and HP laptops.',
    options: [{ label: 'Start Over', next: 'start' }]
  },
  accessories: {
    text: 'We have chargers, cases, headphones and more.',
    options: [{ label: 'Start Over', next: 'start' }]
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', node: 'start' }]);

  const handleOptionClick = (nextNode) => {
    const lastNode = messages[messages.length - 1].node;
    const selectedOption = chatFlow[lastNode].options.find(opt => opt.next === nextNode);

    const newMessages = [
      ...messages,
      { from: 'user', text: selectedOption.label },
      { from: 'bot', node: nextNode }
    ];
    setMessages(newMessages);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 60,
            height: 60,
            fontSize: 28,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 9999
          }}
          aria-label="Open Chatbot"
        >
          💬
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 350,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            padding: 10,
            maxHeight: '75vh',
            overflowY: 'auto',
            zIndex: 9999
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>🤖 Help Assistant</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: 20,
                cursor: 'pointer'
              }}
              aria-label="Close Chatbot"
            >
              ❌
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
            {messages.map((msg, index) => {
              const content = msg.from === 'bot' ? chatFlow[msg.node].text : msg.text;
              return (
                <div key={index} style={{
                  textAlign: msg.from === 'bot' ? 'left' : 'right',
                  marginBottom: 10
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: msg.from === 'bot' ? '#eee' : '#cfe9ff',
                    padding: 8,
                    borderRadius: 6
                  }}>{content}</div>
                </div>
              );
            })}
          </div>

          {/* Options for current bot node */}
          {chatFlow[messages[messages.length - 1].node]?.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt.next)}
              style={{
                display: 'inline-block',
                margin: '5px 5px 0 0',
                padding: '6px 12px',
                borderRadius: 5,
                border: '1px solid #ccc',
                cursor: 'pointer',
                background: '#f8f9fa'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Chatbot;
