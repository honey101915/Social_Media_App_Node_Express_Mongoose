import React from 'react';
import './Home.css';
import { FaHeart, FaComment, FaShare, FaBookmark, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    username: string;
    userImage: string;
    postImage: string;
    caption: string;
}

const posts: Post[] = [
    {
        id: 1,
        username: 'johndoe',
        userImage: 'https://via.placeholder.com/50',
        postImage: 'https://wallpapers.com/images/featured/new-york-city-5oaa14h4mw6w3o71.jpg',
        caption: 'Enjoying the beautiful sunset!',
    },
    {
        id: 2,
        username: 'janedoe',
        userImage: 'https://via.placeholder.com/50',
        postImage: 'https://wallpapers.com/images/featured/new-york-city-5oaa14h4mw6w3o71.jpg',
        caption: 'Great time hiking with friends.',
    },
];

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Home</h1>
            </header>
            <section className="top-right">
                <Link to={"./allUsers"}>
                    <button className="dropdown-toggle">
                        <img
                            src="https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-true-friends-icon-color-flat-png-image_4695403.png"
                            alt="Profile"
                            className="profile-img"
                        />
                        <span>Explore People</span>
                        <FaArrowRight size={16} className="arrow-icon" />
                    </button>
                </Link>
            </section>
            <section className="posts">
                {posts.map(post => (
                    <article key={post.id} className="post-card">
                        <header className="post-header">
                            <img
                                src={post.userImage}
                                alt={post.username}
                                className="user-img"
                            />
                            <h2>{post.username}</h2>
                        </header>
                        <img
                            src={post.postImage}
                            alt="Post"
                            className="post-img"
                        />
                        <div className="post-body">
                            <p>{post.caption}</p>
                            <div className="post-actions">
                                <button className="action-btn"><FaHeart size={24} /></button>
                                <button className="action-btn"><FaComment size={24} /></button>
                                <button className="action-btn"><FaShare size={24} /></button>
                                <button className="action-btn"><FaBookmark size={24} /></button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Home;
