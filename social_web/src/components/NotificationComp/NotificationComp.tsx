import React from 'react';
import './NotificationComp.css';

interface Notification {
    id: number;
    icon: string;
    name: string;
    type: string;
    date: string;
}

const NotificationComp: React.FC<{ notiData: Notification }> = ({ notiData }) => {
    return (
        <div>
            <ul className="notifications-list">
                <li className="notification-item">
                    <div className="notification-icon">{notiData.icon}</div>
                    <div className="notification-details">
                        <p className="notification-name">{notiData.name}</p>
                        <p className="notification-type">{notiData.type}</p>
                        <p className="notification-date">{notiData.date}</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default NotificationComp;
