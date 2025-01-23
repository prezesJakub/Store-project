import React, {useState} from "react";
import "./AddReview.css";

const AddReview = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);  
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email || !message || !rating) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        if(!validateEmail(email)) {
            setError("Proszę wprowadzić prawidłowy adres e-mail!");
            return;
        }

        if(submitted) {
            setError("Możesz dodać tylko jedną opinię!");
            return;
        }

        console.log("Dodano opinię: ", {email, message, rating});
        setError("");
        setSubmitted(true);
    };

    return (
        <div className="add-review-container">
            <h2>Dodaj opinię</h2>
            <form onSubmit={handleSubmit}>
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
                    Wiadomość:
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Napisz swoją opinię"
                    />
                </label>
                <label>
                    Ocena:
                    <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                key={star}
                                type="button"
                                className={(hoverRating || rating) >= star ? "star selected" : "star"}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </label>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="review-submit-button" disabled={submitted}>
                    {submitted ? "Opinia dodana" : "Dodaj opinię"}
                </button>
            </form>
        </div>
    );
};

export default AddReview