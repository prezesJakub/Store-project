import React from "react";
import {Link} from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
    return (
        <div className="order-confirmation">
            <h2>Twoje zamówienie zostało złożone!</h2>
            <p>Dziękujemy za zakupy! Twoje zamówienie zostało pomyślnie złożone!</p>
            <Link to="/">Przejdź do strony głównej</Link>
        </div>
    );
};

export default OrderConfirmation;