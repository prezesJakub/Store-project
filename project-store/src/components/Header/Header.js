import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <h1>Project Store</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;