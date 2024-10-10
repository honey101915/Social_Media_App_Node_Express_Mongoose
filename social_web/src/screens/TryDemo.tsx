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
    const editableRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognitionRef.current.lang = 'en-US'; // Set the language to English (US)
            recognitionRef.current.continuous = false; // Set continuous to false to stop after one result

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
                document.execCommand('insertText', false, transcript);
                console.log('Speech recognition result:', transcript);
            };
        } else {
            alert('Speech recognition not supported in this browser.');
            setIsSpeechRecognitionActive(false);
        }
    }, []);

    const formatText = (command: string, value?: any) => {
        document.execCommand(command, false, value);
        updateButtonState();
    };

    const updateButtonState = () => {
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
    };

    const handleKeyUp = () => {
        updateButtonState();
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
                    onClick={() => formatText('bold')}
                    className={isBold ? 'active' : ''}
                    title="Bold"
                >
                    <i className="fa fa-bold"></i>
                </button>
                <button
                    onClick={() => formatText('italic')}
                    className={isItalic ? 'active' : ''}
                    title="Italic"
                >
                    <i className="fa fa-italic"></i>
                </button>
                <button
                    onClick={() => formatText('underline')}
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

            {isSpeechRecognitionActive && <p className="isSpeaking">
                Listening...
            </p>}

            <div
                ref={editableRef}
                className="editable"
                contentEditable
                suppressContentEditableWarning={true}
                style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}
                onKeyUp={handleKeyUp}
            />
        </div>
    );
};

export default TryDemo;
