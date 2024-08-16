import React, { useState } from 'react';
import './AddPost.css';
import { addNewPostApi } from '../../redux/reduxActions/homeActions';
import { Loader } from '../../components';

const AddPost: React.FC = () => {

    const [isLoding, setLoading] = useState(false)
    const [photo, setPhoto] = useState<File | null>(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            photo,
            caption,
            location,
        });

        _addNewPost()
    };

    const _addNewPost = () => {
        setLoading(true)
        let apiData = {
            mediaFile: "https://c4.wallpaperflare.com/wallpaper/475/928/26/switzerland-4k-desktop-background-hd-wallpaper-preview.jpg",
            caption: "Hey this is my post",
        }

        addNewPostApi(apiData).then((res) => {
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <div className="add-post-container">
            <h2>Add New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input type="file" id="photo" onChange={handlePhotoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="caption">Caption</label>
                    <textarea
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a caption..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add a location"
                    />
                </div>
                <button type="submit" className="submit-btn">Post</button>
            </form>
            {isLoding && <Loader />}
        </div>
    );
};

export default AddPost;
