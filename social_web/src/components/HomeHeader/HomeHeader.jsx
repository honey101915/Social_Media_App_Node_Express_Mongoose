// HomeHeader.js
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './HomeHeader.css';

const HomeHeader = () => {
    return (
        <nav className="header-nav">
            <div className="header-icon">
                <img src="https://www.wscubetech.com/blog/wp-content/uploads/2024/04/social-media-1024x683.webp" alt="Icon" />
            </div>
            <ul className="header-list">
                <li className="header-item">
                    <Link to="/home" className="header-link">Home</Link>
                </li>
                <li className="header-item">
                    <Link to="/profile" className="header-link">Profile</Link>
                </li>
                <li className="header-item">
                    <Link to="/messages" className="header-link">Messages</Link>
                </li>
                <li className="header-item">
                    <Link to="/notifications" className="header-link">Notifications</Link>
                </li>
                <li className="header-item">
                    <Link to="/settings" className="header-link">Settings</Link>
                </li>
                <li className="header-item">
                    <Link to="/aboutUs" className="header-link">About Us</Link>
                </li>
            </ul>
        </nav>
    );
};

export default memo(HomeHeader);
