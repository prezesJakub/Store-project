const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key";

const reviewsFilePath = path.join(__dirname, "../data/reviews.json");

const readReviewsFromFile = () => {
    if (!fs.existsSync(reviewsFilePath)) {
        fs.writeFileSync(reviewsFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(reviewsFilePath, "utf8");
    return JSON.parse(data);
};

const saveReviewsToFile = (reviews) => {
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
};

router.get("/:productId", (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    const reviews = readReviewsFromFile();
    const productReviews = reviews.filter((r) => r.productId === productId);
    res.status(200).json(productReviews);
});

router.post("/:productId", (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    const {message, rating} = req.body;

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({error: "Użytkownik musi być zalogowany!"});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const email = decoded.email;

        if(!email || !message || !rating) {
            return res.status(400).json({error: "Wszystkie pola muszą być uzupełnione!"});
        }

        const reviews = readReviewsFromFile();

        const existingReview = reviews.find(
            (review) => review.productId === productId && review.email === email
        );

        if(existingReview) {
            return res.status(400).json({error: "Użytkownik już dodał recenzję dla tego produktu!"});
        }

        const newReview = {
            id: reviews.length + 1, 
            productId, 
            email, 
            message, 
            rating, 
            date: new Date().toISOString(),
        };

        reviews.push(newReview);
        saveReviewsToFile(reviews);

        res.status(201).json(newReview);
    } catch (error) {
        console.error("Błąd podczas dodawania recenzji", error);
        res.status(500).json({error: "Wystąpił błąd podczas dodawania recenzji"});
    }
});

module.exports = router;