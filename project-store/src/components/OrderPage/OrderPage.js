import React, {useContext, useState} from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

const OrderPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [userInfo, setUserInfo] = useState({ name: '', address: ''});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: ""}));
    };

    const validateForm = () => {
        const newErrors = {};
        if(!userInfo.name.trim()) {
            newErrors.name = "Imię i nazwisko są wymagane";
        }
        if(!userInfo.address.trim()) {
            newErrors.address = "Adres dostawy jest wymagany";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if(!validateForm()) {
            return;
        }

        const order = {
            user: userInfo,
            products: cartItems,
            totalPrice: total,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if(!response.ok) {
                throw new Error('Failed to place order');
            }

            clearCart();
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Error placing order: ', error);
        }
    };

    return (
        <div className="order-page">
            <h2>Podsumowanie zamówienia</h2>
            <div className="order-summary">
                <h3>Produkty:</h3>
                <ul>
                    {cartItems.map((item) => {
                        return (
                            <li key={item.id} className="order-item">
                                <img src={item.image} alt={item.title} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p>Ilość: {item.quantity}</p>
                                   <p>Cena: ${item.price.toFixed(2)}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <h3>Łączna kwota: ${total.toFixed(2)}</h3>
            </div>

            <h3>Dane użytkownika</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Imię i nazwisko"
                        value={userInfo.name}
                        onChange={handleChange}
                        className={errors.name ? "error" : ""}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        name="address"
                        placeholder="Adres dostawy"
                        value={userInfo.address}
                        onChange={handleChange}
                        className={errors.address ? "error" : ""}
                    />
                    {errors.address && <p className="error-message">{errors.address}</p>}
                </div>
                <button type="button" onClick={handleSubmit}>
                    Złóż zamówienie
                </button>
            </form>
        </div>
    );
};

export default OrderPage;