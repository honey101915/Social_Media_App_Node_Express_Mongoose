import React from 'react';
import './Profile.css';

const ProfileScreen = () => {
    // Dummy data for the user profile
    const user = {
        username: 'john_doe',
        userType: 'Admin',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-123-456-7890',
        profileImage: 'https://via.placeholder.com/150',
        about: 'Passionate developer with a love for coding and technology.',
        profession: 'Software Engineer',
        interests: ['Coding', 'Music', 'Traveling', 'Photography'],
        dob: '1990-01-01',
        age: 34,
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.profileImage} alt="Profile" className="profile-image" />
                <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p className="username">@{user.username}</p>
                    <p className="usertype">{user.userType}</p>
                </div>
            </div>
            <div className="profile-details">
                <h3>Profile Details</h3>
                <div className="details-row">
                    <div className="details-col">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Date of Birth:</strong> {user.dob}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                    </div>
                    <div className="details-col">
                        <p><strong>Profession:</strong> {user.profession}</p>
                        <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
                        <p><strong>About:</strong> {user.about}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
