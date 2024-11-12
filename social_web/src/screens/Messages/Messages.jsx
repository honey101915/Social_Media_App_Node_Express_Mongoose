import { useState } from 'react';
import { Header } from '../../components';
import "./Messages.css"
export const Messages = (props) => {
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I assist you today?', sender: 'bot' },
    ]);

    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: 'user' },
                { text: 'I am here to help you!', sender: 'bot' }, // Example bot response
            ]);

            setInput('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && input.trim()) {
            sendMessage();
        }
    };
    return (
        <div>
            <Header title={"Messages"} />
            <div className="chat-screen">
                <div className="chat-window">
                    <div className="message-list">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="chat-input"
                    />
                    <button
                        onClick={sendMessage}
                        className="send-button"
                        disabled={!input.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Messages