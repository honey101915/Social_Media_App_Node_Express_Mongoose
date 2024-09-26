import React, { useState } from 'react';
import './OtpScreen.css';

const OtpScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Allow only digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;

        // Move to next input
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        // Update OTP state
        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`OTP Entered: ${otp.join('')}`);
    };

    return (
        <div className='main-container'>
            <div className="otp-container">
                <h1 className="otp-title">Enter OTP</h1>
                <form onSubmit={handleSubmit} className="otp-form">
                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="otp-input"
                            />
                        ))}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default OtpScreen;
