import React, {useState} from "react";
import "./Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        console.log("Logowanie:", {email, password});
        setError("");
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
        </div>
    );
};

export default Login;