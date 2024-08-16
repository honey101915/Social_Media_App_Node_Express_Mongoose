// src/PersonComp.tsx
import React from 'react';
import './UserComp.css';

type PersonProps = {
    personData: {
        _id: number;
        name: string;
        userName: string;
        profileImage: string;
    };
    personIndex: number
};

const UserComp: React.FC<PersonProps> = ({ personData, personIndex }) => {
    return (
        <div className="people-list-container" key={personData?._id}>
            {/* <h2>{personIndex}</h2> */}
            <div className="person-card">
                <img src={personData?.profileImage} alt={personData?.name} className="person-image" />
                <div className="person-details">
                    <h2>{personData?.name}</h2>
                    <p>{personData?.userName}</p>
                    <div className="action-buttons">
                        <button className="send-request-btn">Send Request</button>
                        <button className="message-btn">Message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComp;
