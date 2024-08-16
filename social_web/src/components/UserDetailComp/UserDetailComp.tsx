import React from 'react';
import './UserDetailComp.css';
import moment from 'moment';

type Post = {
    id: number;
    fileUrl: string;
    caption: string;
    createdAt?: string
};

type UserDetailCompProps = {
    user: {
        id?: number;
        name?: string;
        userName?: string;
        email?: string;
        profileImage?: string;
    };
    posts: Post[];
};

const UserDetailComp: React.FC<UserDetailCompProps> = ({ user, posts }) => {
    return (
        <div className="user-details-container">
            <div className="profile-section">
                <img src={user?.profileImage} alt={user?.name} className="profile-pic" />
                <div className="user-info">
                    <h2 className='name-text'>{user?.name}</h2>
                    <p className='name-text'>@{user?.userName}</p>
                    <p>{user?.email}</p>
                    <div className="action-buttons">
                        <button className="add-friend-btn">Add Friend</button>
                        <button className="message-btn">Message</button>
                    </div>
                </div>
            </div>

            <div className="posts-section">
                <h3>Posts</h3>
                {(Array.isArray(posts) && posts.length > 0) ?
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <div key={post?.id} className="post-card">
                                <img src={post?.fileUrl} alt="Post" className="post-image" />
                                <p className="post-caption">{post?.caption}</p>
                                <p className="post-caption">{moment(post?.createdAt).format("lll")}</p>
                            </div>
                        ))}
                    </div>
                    :
                    <h3>No posts available</h3>
                }
            </div>
        </div>
    );
};

export default UserDetailComp;
