import React, {useState, useEffect} from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Błąd podczas decodowania tokena", error);
                setRole(null);
            }
        }
    }, [token]);

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
                        {token && role === "admin" && (
                            <li>
                                <Link to="/orders" className="orders-link">Historia zamówień</Link>
                            </li>
                        )}
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