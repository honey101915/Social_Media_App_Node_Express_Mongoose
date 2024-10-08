import React, { useState } from 'react';
import './OtpScreen.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtpApi } from '../../redux/reduxActions/authActions';
import { notifyError, notifySuccess } from '../../utils/ToastConfig';
import { ApiError, ApiSuccessResponse } from '../../utils/helperFunctions';
import { Loader } from '../../components';
const OtpScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const payload = location.state;

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);

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

        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const _handleSubmit = (e) => {
        e.preventDefault();

        console.log('====================================');
        console.log(otp.join(''), "otpotpotpotpotp", payload);
        console.log('====================================');
        // return
        // alert(`OTP Entered: ${otp.join('')}`);
        let _apiData = {
            email: String(payload?.email).trim(),
            otp: otp.join('')
        }
        verifyOtpApi(_apiData).then((res) => {
            setLoading(false)
            notifySuccess(ApiSuccessResponse(res))
            _moveToHome()
        }).catch((error) => {
            notifyError(ApiError(error))
            setLoading(false)
        })
    }

    const _moveToHome = () => navigate('/home');

    const _onGoBack = () => {
        navigate(-1);
    }

    return (
        <div className='main-container'>
            <div className="otp-container">
                <h1 className="otp-title">Enter OTP</h1>
                <div className="otp-form">
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

                    <div className="button-view">
                        <button type="back" className="back-button" onClick={_onGoBack}>Back</button>
                        <button type="submit" className="submit-button" onClick={_handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>
            {loading ? <Loader /> : <></>}
        </div>
    );
};

export default OtpScreen;
