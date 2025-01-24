const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const ordersPath = path.join(__dirname, "../data/orders.json");
const JWT_SECRET = "your_jwt_secret_key"

const readOrders = () => {
    return JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
};

const writeOrders = (orders) => {
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf-8');
};

router.get("/", (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
    res.json(orders);
});

router.get("/:id", (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if(!order) return res.status(404).json({error: "Zamówienie nieznalezione"});
    res.json(order);
});

router.post("/", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({error: "Brak tokenu, proszę się zalogować!"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const {products, totalPrice, user} = req.body;

        if(!products || !totalPrice || !user) {
            return res.status(400).json({error: "Produkty i cena są wymagane!"});
        }

        const totalPriceNumber = parseFloat(totalPrice);
        if (isNaN(totalPriceNumber)) {
            return res.status(400).json({error: "totalPrice musi być liczbą"});
        }

        const orders = readOrders();

        const newOrder = {
            id: orders.length + 1,
            userId: decoded.id,
            products,
            totalPrice: totalPriceNumber,
            userName: user.name,
            userAddress: user.address,
            date: new Date().toISOString()
        };
        
        orders.push(newOrder);

        writeOrders(orders);
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(401).json({error: "Nieprawidłowy token"});
    }
});

module.exports = router;
