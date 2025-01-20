import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()-.,=])[A-Za-z\d@$!%*?&#^()-.,=]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if(!email || !password || !confirmPassword) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        if(!validateEmail(email)) {
            setError("Proszę wprowadzić prawidłowy adres e-mail!");
            return;
        }

        if(password !== confirmPassword) {
            setError("Hasła muszą się zgadzać!");
            return;
        }

        if(!validatePassword(password)) {
            setError("Hasło musi mieć co najmniej 8 znaków, jedną wielką literę, jedną cyfrę i jeden znak specjalny!");
            return;
        }

        console.log("Rejestracja:", {email, password});
        setError("");

        navigate("/registration-confirmation");
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if(!validateEmail(value)) {
            setError("Nieprawidłowy adres e-mail!")
        } else {
            setError("");
        }
    }

    return (
        <div className="auth-container">
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Email: 
                    <input 
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Wprowadź e-mail"
                    />
                </label>
                <label>
                    Hasło: 
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Wprowadź hasło"
                    />
                </label>
                <label>
                    Potwierdź hasło: 
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Potwierdź hasło"
                    />
                </label>
                <label className="show-password">
                    <input 
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    Pokaż hasło
                </label>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Zarejestruj się</button>
            </form>
        </div>
    );
};

export default Register;