import React, {useContext} from "react";
import {CartContext} from "../../context/CartContext";
import "./Cart.css"

const Cart = () => {
    const {cartItems, removeFromCart, updateQuantity} = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="cart">
            <h2>Twój koszyk</h2>
            {cartItems.length === 0 ? (
                <p>Twój koszyk jest pusty!</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p className="price">${item.price.toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity-1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity+1)}>+</button>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Usuń
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>Łączna cena: ${totalPrice.toFixed(2)}</h3>
                    <button className="checkout-button">Przejdź do zamówienia</button>
                </div>
            )}
        </div>
    );
};

export default Cart;