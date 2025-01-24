import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";
import "./Profile.css";

const Profile = () => {
    const {orders, updateOrders} = useOrders();
    const [userData, setUserData] = useState(null);
    
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async() => {
            try {
                const token = localStorage.getItem("token");

                if(!token) {
                    navigate("/login");
                    return;
                }

                const userResponse = await fetch("http://localhost:5001/api/users/profile", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if(!userResponse.ok) {
                    if(userResponse.status === 401) {
                        localStorage.removeItem("token");
                        navigate("/login");
                    } else {
                        throw new Error("Błąd pobierania danych użytkownika!");
                    }
                    return;
                }

                const userData = await userResponse.json();
                setUserData(userData);

                const productsResponse = await fetch("http://localhost:5001/api/products");

                if(!productsResponse.ok) {
                    throw new Error("Błąd pobierania produktów");
                }

                const productsData = await productsResponse.json();
                setProducts(productsData);

                await updateOrders();
            } catch (err) {
                console.error(err);
                setError("Nie udało się załadować danych");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchProfileData();
    }, [navigate, updateOrders]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const getProductName = (productId) => {
        if(!products || products.length === 0) return `Produkt ${productId}`;
        const product = products.find((p) => p.id === productId);
        return product ? product.title : `Produkt ${productId}`;
    }

    if(error) {
        return <p className="error-message">{error}</p>;
    }

    if(!userData) {
        return <p>Ładowanie danych użytkownika...</p>;
    }

    return (
        <div className="profile-container">
            <h2>Profil użytkownika</h2>
            <div className="user-details">
                <p><strong>Nazwa użytkownika:</strong> {userData.username}</p>
                <p><strong>E-mail:</strong> {userData.email}</p>
                <p><strong>Rola:</strong> {userData.role}</p>
            </div>
            <h3>Historia zamówień</h3>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p><strong>Zamówienie #{order.id}</strong></p>
                            <p>Produkty:{" "} 
                                {order.products?.map((product, index) => (
                                    <span key={product.id}>
                                        {getProductName(product.id)} (x{product.quantity})
                                        {index < order.products.length - 1 && ", "}
                                    </span>
                                ))}
                            </p>
                            <p>Suma: {order.totalPrice} $</p>
                            <p>Data: {new Date(order.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak zamówień</p>
            )}

            <button className="logout-button" onClick={handleLogout}>
                Wyloguj
            </button>
        </div>
    );
};

export default Profile;