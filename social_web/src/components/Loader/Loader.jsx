// Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="loader-container">
            <ClipLoader color="#4fa94d" loading={true} size={150} />
        </div>
    );
};

export default Loader;
