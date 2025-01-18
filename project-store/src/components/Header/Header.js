import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-link">
                    <h1>Project Store</h1>
                </Link>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/" className="home-link">Home</Link></li>
                        <li><Link to="/cart" className="cart-link">Koszyk</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;