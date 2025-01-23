import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if(!response.ok) {
                setError(data.error || "Wystąpił błąd!");
                return;
            }

            localStorage.setItem("token", data.token);
            setError("");
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Błąd serwera");
        }
    };

    const handleRegisterRedirect = () => {
        navigate("/register");
    };

    return (
        <div className="auth-container">
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email: 
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <label className="show-password">
                    <input 
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    Pokaż hasło
                </label>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Zaloguj się</button>
            </form>
            <div className="register-link">
                <p>Nie masz jeszcze konta?</p>
                <button onClick={handleRegisterRedirect}>Zarejestruj się</button>
            </div>
        </div>
    );
};

export default Login;