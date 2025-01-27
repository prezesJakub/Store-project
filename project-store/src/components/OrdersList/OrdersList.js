import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./OrdersList.css";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await fetch("http://localhost:5001/api/orders", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if(!ordersResponse.ok) {
                    throw new Error("Błąd wczytywania zamówień");
                }
                const ordersData = await ordersResponse.json();

                const productsResponse = await fetch("http://localhost:5001/api/products");
                if(!productsResponse.ok) {
                    throw new Error("Błąd wczytywania produktów");
                }
                const productsData = await productsResponse.json();

                setOrders(ordersData);
                setProducts(productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, []);

    const getProductName = (productId) => {
        const product = products.find((p) => p.id === productId);
        return product ? product.title : `Produkt ${productId}`;
    };

    if(loading) {
        return <p>Ładowanie zamówień...</p>;
    }

    if(error) {
        return <p>Błąd: {error}</p>;
    }

    return (
        <div className="orders-list-container">
            <h1>Historia zamówień</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="order-item">
                        <div>
                            <p className="order-id"><strong>Zamówienie #</strong>{order.id}</p>
                            <p className="order-user"><strong>Odbiorca:</strong> {order.userName}</p>
                            <p className="order-products"><strong>Produkty:</strong>{" "} 
                            {order.products.map((product, index) => (
                                <span key={product.id}>
                                    {getProductName(product.id)} (x{product.quantity})
                                    {index < order.products.length - 1 && ", "}
                                </span>
                            ))}
                            </p>
                            <Link to={`/orders/${order.id}`} className="details-link">
                                Zobacz szczegóły
                            </Link>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersList;