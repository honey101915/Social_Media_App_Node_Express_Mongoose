import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa'; // Import back arrow icon
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Import custom CSS file

const Header = ({ title }) => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
        </header>
    );
};

export default Header;
