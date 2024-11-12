// src/App.js

import React, { useState } from 'react';
import './Messages.css';

const Messages = () => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Alice', text: 'Hey, how are you?' },
        { id: 2, user: 'Bob', text: 'I\'m good! How about you?' },
        { id: 3, user: 'Alice', text: 'I\'m doing well, thanks!' },
    ]);

    const [currentUser, setCurrentUser] = useState('Alice');

    // People list data
    const people = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ];

    const handleSendMessage = (text) => {
        if (text.trim() === '') return;
        setMessages([...messages, { id: messages.length + 1, user: currentUser, text }]);
    };

    return (
        <div className="app-container">
            <PeopleList people={people} currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <ChatScreen messages={messages} currentUser={currentUser} handleSendMessage={handleSendMessage} />
        </div>
    );
};

const PeopleList = ({ people, currentUser, setCurrentUser }) => {
    return (
        <div className="people-list">
            <h3>People</h3>
            <ul>
                {people.map((person) => (
                    <li
                        key={person.id}
                        className={currentUser === person.name ? 'active' : ''}
                        onClick={() => setCurrentUser(person.name)}
                    >
                        {person.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ChatScreen = ({ messages, currentUser, handleSendMessage }) => {
    const [messageText, setMessageText] = useState('');

    const handleInputChange = (e) => {
        setMessageText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSendMessage(messageText);
        setMessageText('');
    };

    return (
        <div className="chat-screen">
            <div className="chat-header">
                <h2>Chat with {currentUser}</h2>
            </div>
            <div className="chat-messages">
                {messages
                    .map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.user === currentUser ? 'sent' : 'received'}`}
                        >
                            <p>{message.text}</p>
                        </div>
                    ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={messageText}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Messages;
