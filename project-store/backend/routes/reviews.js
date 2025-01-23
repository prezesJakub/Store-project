const express = require("express");
const router = express.Router();
const reviews = [];

router.get("/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    const productReviews = reviews.filter(r => r.productId === productId);
    res.json(productReviews);
});

router.post("/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);
    const {email, message, rating} = req.body;

    const newReview = {id: reviews.length + 1, productId, email, message, rating, date: new Date()};
    reviews.push(newReview);
    res.status(201).json(newReview);
});

module.exports = router;