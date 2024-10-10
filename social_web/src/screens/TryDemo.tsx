import React, { useState, useEffect, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import './TryDemo.css';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const TryDemo = () => {
    const [fontSize, setFontSize] = useState('3'); // Default font size
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
    const [text, setText] = useState(''); // State to handle textarea content
    const recognitionRef = useRef<any>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognitionRef.current.lang = 'en-US'; // Set the language to English (US)
            recognitionRef.current.continuous = false; // Stop after one result

            recognitionRef.current.onstart = () => {
                console.log('Speech recognition service started');
            };

            recognitionRef.current.onend = () => {
                console.log('Speech recognition service ended');
                setIsSpeechRecognitionActive(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                alert('Error occurred during speech recognition: ' + event.error);
                setIsSpeechRecognitionActive(false);
            };

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                console.log('Speech recognition result:', transcript);
                insertTranscriptIntoTextarea(transcript);
            };
        } else {
            alert('Speech recognition not supported in this browser.');
            setIsSpeechRecognitionActive(false);
        }
    }, []);

    // Insert transcript into textarea
    const insertTranscriptIntoTextarea = (transcript: string) => {
        if (textareaRef.current) {
            const startPos = textareaRef.current.selectionStart;
            const endPos = textareaRef.current.selectionEnd;
            const textBefore = text.substring(0, startPos);
            const textAfter = text.substring(endPos, text.length);
            const newText = textBefore + transcript + textAfter;

            setText(newText); // Update textarea content
        }
    };

    const applyFormatting = (type: string) => {
        if (textareaRef.current) {
            const startPos = textareaRef.current.selectionStart;
            const endPos = textareaRef.current.selectionEnd;

            let selectedText = text.substring(startPos, endPos);

            if (type === 'bold') {
                selectedText = `**${selectedText}**`;
                setIsBold(!isBold);
            } else if (type === 'italic') {
                selectedText = `*${selectedText}*`;
                setIsItalic(!isItalic);
            } else if (type === 'underline') {
                selectedText = `<u>${selectedText}</u>`;
                setIsUnderline(!isUnderline);
            }

            const textBefore = text.substring(0, startPos);
            const textAfter = text.substring(endPos);

            setText(textBefore + selectedText + textAfter);
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const toggleSpeechRecognition = () => {
        if (isSpeechRecognitionActive) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setIsSpeechRecognitionActive(!isSpeechRecognitionActive);
    };

    return (
        <div className={`text-editor ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className={`toolbar ${isFullscreen ? 'fullscreen-toolbar' : ''}`}>
                <button
                    onClick={() => applyFormatting('bold')}
                    className={isBold ? 'active' : ''}
                    title="Bold"
                >
                    <i className="fa fa-bold"></i>
                </button>
                <button
                    onClick={() => applyFormatting('italic')}
                    className={isItalic ? 'active' : ''}
                    title="Italic"
                >
                    <i className="fa fa-italic"></i>
                </button>
                <button
                    onClick={() => applyFormatting('underline')}
                    className={isUnderline ? 'active' : ''}
                    title="Underline"
                >
                    <i className="fa fa-underline"></i>
                </button>

                <button
                    onClick={toggleSpeechRecognition}
                    className={isSpeechRecognitionActive ? 'active' : ''}
                    title={isSpeechRecognitionActive ? 'Stop Speech Recognition' : 'Start Speech Recognition'}
                >
                    <i className="fa fa-microphone"></i>
                </button>
                <button onClick={toggleFullscreen} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                    <i className={`fa ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                </button>
            </div>

            {isSpeechRecognitionActive && <p className="isSpeaking">Listening...</p>}

            <textarea
                ref={textareaRef}
                className="editable-textarea"
                style={{ width: '100%', padding: '10px', minHeight: '200px', border: '1px solid #ccc' }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};

export default TryDemo;
