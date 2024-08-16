import React, { useEffect, useState } from 'react';
import './Home.css';
import { FaHeart, FaComment, FaShare, FaBookmark, FaArrowRight, FaPlus, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllPostApi } from '../../redux/reduxActions/homeActions';
import { notifyError } from '../../utils/ToastConfig';
import { ApiError } from '../../utils/helperFunctions';

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

    const [allPosts, setAllPosts] = useState([])
    const [isLoding, setLoading] = useState(true)

    useEffect(() => {
        _getAllUsersPosts()
    }, [])

    const _getAllUsersPosts = () => {
        let _query = `?type=HOME`
        getAllPostApi(_query).then((res: any) => {
            console.log(res, "getAllPostApi");
            setAllPosts(res?.data)
        }).catch((error: any) => {
            notifyError(ApiError(error))
            setLoading(false)
        })
    }

    return (
        <div className="home-container">
            <header className="header">
                <h1>Home</h1>
            </header>

            <section className="common-buttons">
                <Link to={"./addPost"}>
                    <button className="common-btn">
                        <FaPlus size={20} className="common-btn-icon" />
                        Add Post
                    </button>
                </Link>
                <Link to={"./allUsers"}>
                    <button className="common-btn">
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
