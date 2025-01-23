const express = require("express");
const router = express.Router();
const orders = require("../data/orders.json");

router.get("/", (req, res) => {
    res.json(orders);
});

router.get("/:id", (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if(!order) return res.status(404).json({error: "Zamówienie nieznalezione"});
    res.json(order);
});

router.post("/", (req, res) => {
    const {userId, products, totalPrice} = req.body;

    if(!userId || !products || !totalPrice) {
        return res.status(400).json({error: "Wszystkie pola są wymagane!"});
    }

    const newOrder = {
        id: orders.length + 1,
        userId,
        products,
        totalPrice,
        date: new Date().toISOString()
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

module.exports = router;
