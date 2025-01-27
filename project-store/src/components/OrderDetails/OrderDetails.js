import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
    const {orderId} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if(!token) {
                    navigate("/login");
                    return;
                }

                const orderResponse = await fetch(`http://localhost:5001/api/orders/${orderId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if(!orderResponse.ok) {
                    throw new Error("Błąd pobierania szczegółów zamówienia");
                }
                const orderData = await orderResponse.json();
                setOrder(orderData);

                const userResponse = await fetch(`http://localhost:5001/api/users/user/${orderData.userId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                
                if(!userResponse.ok) {
                    throw new Error("Błąd pobierania danych użytkownika");
                }
                const userData = await userResponse.json();
                setUser(userData);

                const productsResponse = await fetch("http://localhost:5001/api/products", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                
                if(!productsResponse.ok) {
                    throw new Error("Błąd pobierania produktów");
                }
                const productsData = await productsResponse.json();
                setProducts(productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, navigate]);

    const getProductDetails = (productId) => {
        return products.find((product) => product.id === productId) || {};
    };

    if(loading) {
        return <p>Ładowanie szczegółów zamówienia...</p>;
    }

    if(error) {
        return <p>Błąd: {error}</p>;
    }

    if(!order || !user) {
        return <p>Nie znaleziono zamówienia lub użytkownika</p>;
    }

    return (
        <div className="order-details">
            <h1>Szczegóły zamówienia #{order.id}</h1>
            <div className="order-info">
                <h2>Dane użytkownika</h2>
                <p><strong>Imię i nazwisko:</strong> {order.userName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Adres dostawy:</strong> {order.userAddress}</p>
            </div>

            <div className="order-products">
                <h2>Produkty</h2>
                <ul>
                    {order.products.map((product) => {
                        const productDetails = getProductDetails(product.id);
                        return (
                            <li key={product.id} className="product-item">
                                <img 
                                    src={productDetails.image}
                                    alt={productDetails.title}
                                    className="order-details-product-image"
                                />
                                <div>
                                    <p><strong>Nazwa:</strong> {productDetails.title}</p>
                                    <p><strong>Cena:</strong> {productDetails.price.toFixed(2)} $</p>
                                    <p><strong>Ilość:</strong> {product.quantity}</p>
                                    <p><strong>Łączna cena:</strong> {(product.quantity * productDetails.price).toFixed(2)} $</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="order-summary">
                <h2>Podsumowanie</h2>
                <p><strong>Łączna wartość zamówienia:</strong> {order.totalPrice.toFixed(2)} $</p>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>Wróć</button>
        </div>
    );
};

export default OrderDetails;