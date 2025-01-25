import React, {useState, useEffect} from "react";
import "./EditReview.css";

const EditReview = ({review, onCancel, onUpdate}) => {
    const [message, setMessage] = useState(review.message || "");
    const [rating, setRating] = useState(review.rating || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [error, setError] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if(!message || !rating) {
            setError("Wszystkie pola muszą być uzupełnione!");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:5001/api/reviews/${review.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({message, rating}),
            });

            if(response.ok) {
                const updatedReview = await response.json();
                onUpdate(updatedReview);
            } else {
                console.error("Błąd edycji recenzji");
            }
        } catch (error) {
            console.error("Błąd podczas edytowania recenzji", error);
        }
    };

    return (
        <div className="edit-review-container">
            <h2>Edytuj swoją recenzję</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Wiadomość:
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Zaktualizuj swoją opinię"
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
                <div className="edit-actions">
                    <button type="submit" className="review-submit-button" onClick={handleUpdate}>
                        Zapisz zmiany
                    </button>
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditReview;