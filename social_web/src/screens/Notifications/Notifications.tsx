import React from 'react';
import './Notifications.css';
import NotificationComp from '../../components/NotificationComp/NotificationComp';
import { Header } from '../../components';

// Define types for notification data
interface Notification {
    id: number;
    icon: string;
    name: string;
    type: string;
    date: string;
}

// Mock notification data
const allNotifications: any = [
    { id: 1, icon: '🆕', name: 'John Doe', type: 'New Request', date: '2024-08-13' },
    { id: 2, icon: '✅', name: 'Jane Smith', type: 'Request Accepted', date: '2024-08-12' },
    { id: 3, icon: '📩', name: 'Alice Johnson', type: 'New Message', date: '2024-08-11' },
    { id: 4, icon: '❤️', name: 'Bob Brown', type: 'Like Your Post', date: '2024-08-10' },
    { id: 5, icon: '💬', name: 'Charlie Davis', type: 'Commented on Your Post', date: '2024-08-09' },
    { id: 6, icon: '🆕', name: 'John Doe', type: 'New Request', date: '2024-08-13' },
    { id: 7, icon: '✅', name: 'Jane Smith', type: 'Request Accepted', date: '2024-08-12' },
    { id: 8, icon: '📩', name: 'Alice Johnson', type: 'New Message', date: '2024-08-11' },
    { id: 9, icon: '❤️', name: 'Bob Brown', type: 'Like Your Post', date: '2024-08-10' },
    { id: 10, icon: '💬', name: 'Charlie Davis', type: 'Commented on Your Post', date: '2024-08-09' },
    { id: 11, icon: '🆕', name: 'John Doe', type: 'New Request', date: '2024-08-13' },
    { id: 12, icon: '✅', name: 'Jane Smith', type: 'Request Accepted', date: '2024-08-12' },
    { id: 13, icon: '📩', name: 'Alice Johnson', type: 'New Message', date: '2024-08-11' },
    { id: 14, icon: '❤️', name: 'Bob Brown', type: 'Like Your Post', date: '2024-08-10' },
    { id: 15, icon: '💬', name: 'Charlie Davis', type: 'Commented on Your Post', date: '2024-08-09' },
    { id: 16, icon: '🆕', name: 'John Doe', type: 'New Request', date: '2024-08-13' },
    { id: 17, icon: '✅', name: 'Jane Smith', type: 'Request Accepted', date: '2024-08-12' },
    { id: 18, icon: '📩', name: 'Alice Johnson', type: 'New Message', date: '2024-08-11' },
    { id: 19, icon: '❤️', name: 'Bob Brown', type: 'Like Your Post', date: '2024-08-10' },
    { id: 20, icon: '💬', name: 'Charlie Davis', type: 'Commented on Your Post', date: '2024-08-09' }
]


const Notifications: React.FC = () => {
    return (
        <div className="notifications-container">
            <Header title={"Notifications"} />
            {
                allNotifications.map((item: Notification) => (
                    <NotificationComp key={item.id} notiData={item} />
                ))
            }
        </div>
    );
};

export default Notifications;
