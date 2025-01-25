import React, {useState, useEffect} from "react";
import "./AddReview.css";

const AddReview = ({productId, isLoggedIn, onReviewAdded, onReviewDeleted}) => {
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);  
    const [error, setError] = useState("");
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);

    const checkIfReviewed = async () => {
        if (!isLoggedIn) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5001/api/reviews/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            const reviews = await response.json();

            const userReview = reviews.find((review) => review.email === JSON.parse(atob(token.split(".")[1])).email);
            if(userReview) {
                setAlreadyReviewed(true);
            }
        } catch (error) {
            console.error("Błąd podczas sprawdzania recenzji:", error);
        }
    };

    useEffect(() => {
        checkIfReviewed();
    }, [productId, isLoggedIn, onReviewAdded]);

    useEffect(() => {
        if(onReviewDeleted) {
            setAlreadyReviewed(false);
        }
    }, [onReviewDeleted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isLoggedIn) {
            setError("Musisz być zalogowany, aby dodać recenzję!");
            return;
        }

        if(alreadyReviewed) {
            setError("Możesz dodać tylko jedną opinię dla tego produktu!");
            return;
        }

        if(!message || !rating) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5001/api/reviews/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({message, rating}),
            });

            if(!response.ok) {
                const data = await response.json();
                setError(data.error || "Nie udało się dodać recenzji");
                return;
            }

            setError("");
            setAlreadyReviewed(true);
            setMessage("");
            setRating(0);
            setHoverRating(0);
            onReviewAdded();
        } catch (error) {
            console.error("Błąd podczas dodawania recezji", error);
            setError("Wystąpił błąd podczas dodawania recenzji.");
        }
    };

    return (
        <div className="add-review-container">
            <h2>Dodaj opinię</h2>
            {!isLoggedIn ? (
                <p>Musisz być zalogowany, aby dodać recenzję.</p>
            ) : alreadyReviewed ? (
                <p>Już dodałeś recenzję dla tego produktu.</p>
            ) : (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="review-submit-button">
                        Dodaj opinię
                    </button>
                </form>
            )}          
        </div>
    );
};

export default AddReview;