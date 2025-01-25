import React from "react";
import {Link} from "react-router-dom";
import "./RegistrationConfirmation.css";

const RegistrationConfirmation = () => {
    return (
        <div className="confirmation-container">
            <h2>Rejestracja zakończona sukcesem!</h2>
            <p>Twoje konto zostało utworzone. Możesz się teraz zalogować.</p>
            <Link to="/login" className="login-link">
                Przejdź do logowania
            </Link>
        </div>
    );
};

export default RegistrationConfirmation;