import React, { useState } from 'react';
import { Header } from '../../components';
import './Settings.css';

export const Settings = () => {
    const [isPrivate, setIsPrivate] = useState(false);

    const handleToggle = () => {
        setIsPrivate(!isPrivate);
    };

    return (
        <div className="settings-container">
            <Header title="Settings" />
            <div className="setting-item">
                <span className="setting-label">Private Profile</span>
                <div className="toggle-container">
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={handleToggle}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="status-text">
                        {isPrivate ? 'Private' : 'Public'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Settings;
