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
    personIndex: number,
    handleCardClick: any,
    onclickSendRequest?: any,
    onclickSendMessage?: any,
};

const UserComp: React.FC<PersonProps> = ({
    personData,
    personIndex,
    handleCardClick,
    onclickSendRequest,
    onclickSendMessage
}) => {
    return (
        <div className="people-list-container" key={personData?._id}
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}>
            {/* <h2>{personIndex}</h2> */}
            <div className="person-card">
                <img src={personData?.profileImage} alt={personData?.name} className="person-image" />
                <div className="person-details">
                    <h1 className='name-text'>{personData?.name}</h1>
                    <p className='name-text'>{"@" + personData?.userName}</p>
                    <div className="action-buttons">
                        <button className="send-request-btn" onClick={onclickSendRequest}>Follow</button>
                        <button className="message-btn" onClick={onclickSendMessage}>Message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComp;
