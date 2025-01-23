import React, { useState } from "react";
import "./ReviewsList.css";

const ReviewsList = ({reviews}) => {
    const [filterStars, setFilterStars] = useState(0);
    const [sortOption, setSortOption] = useState("date-desc");

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
        return (totalStars / reviews.length).toFixed(1);
    };

    const filteredAndSortedReviews = reviews
        .filter((review) => review.stars >= filterStars)
        .sort((a, b) => {
            if(sortOption === "date-desc") {
                return new Date(b.date) - new Date(a.date);
            } else if(sortOption === "date-asc") {
                return new Date(a.date) - new Date(b.date);
            } else if(sortOption === "stars-desc") {
                return b.stars - a.stars;
            } else if(sortOption === "stars-asc") {
                return a.stars - b.stars;
            }
            return 0;
        });

    const averageRating = calculateAverageRating(reviews);

    return (
        <div className="reviews-list">
            <h2>Opinie użytkowników</h2>
            <p className="average-rating">
                Średnia ocena: <strong>{averageRating} / 5</strong>
            </p>

            <div className="filter-sort-panel">
                <label>
                    Filtruj według gwiazdek:
                    <select
                        value={filterStars}
                        onChange={(e) => setFilterStars(Number(e.target.value))}
                    >
                        <option value="0">Wszystkie</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">Tylko 5</option>
                    </select>
                </label>

                <label>
                    Sortuj według:
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="date-desc">Data (najnowsze)</option>
                        <option value="date-asc">Data (najstarsze)</option>
                        <option value="stars-desc">Ocena (najwyższa)</option>
                        <option value="stars-asc">Ocena (najniższa)</option>
                    </select>
                </label>
            </div>
            {reviews.length === 0 ? (
                <p>Brak opinii dla tego produktu! Dodaj swoją opinię!</p>
            ) : (
                filteredAndSortedReviews.map((review, index) => (
                    <div className="review-card" key={index}>
                        <div className="review-header">
                            <p className="review-email">{review.email}</p>
                            <p className="review-stars">
                                {"★".repeat(review.stars)}
                                {"☆".repeat(5 - review.stars)}
                            </p>
                        </div>
                        <p className="review-message">{review.message}</p>
                        <p className="review-date">
                            {new Date(review.date).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewsList;