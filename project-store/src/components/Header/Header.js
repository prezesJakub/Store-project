import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleNotLoggedClick = () => {
        if (!token) {
            navigate("/login");
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-link">
                    <h1>Project Store</h1>
                </Link>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/" className="home-link">Home</Link></li>
                        <li>
                            {token ? (
                                <Link to="/cart" className="cart-link">Koszyk</Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="cart-link"
                                    onClick={handleNotLoggedClick}
                                >
                                    Koszyk
                                </Link>
                            )}
                        </li>
                        <li>
                            {token ? (
                                <Link to="/profile" className="profile-link">Profil</Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="profile-link"
                                    onClick={handleNotLoggedClick}
                                >
                                    Profil
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;