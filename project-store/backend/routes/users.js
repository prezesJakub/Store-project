const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = require(usersFilePath);

const ordersFilePath = path.join(__dirname, "../data/orders.json");
const orders = require(ordersFilePath);

const JWT_SECRET = "your_jwt_secret_key";

router.get("/", (req, res) => {
    res.json(users);
});

router.get("/user/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({error: "Użytkownik nieznaleziony"});
    res.json(user);
}); 

router.post("/register", async (req, res) => {
    const {username, password, email} = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({error: "Wszystkie pola są wymagane!"});
    }

    const existingUser = users.find(u => u.email === email);

    if(existingUser) {
        return res.status(400).json({error: "Użytkownik o tym e-mailu już istnieje!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        role: "user"
    };

    users.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({message: "Użytkownik zarejestrowany pomyślnie!"});
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error: "Wszystkie pola są wymagane!"});
    }

    const user = users.find(u => u.email === email);
    if(!user) {
        return res.status(404).json({error: "Użytkownik nie istnieje!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(401).json({error: "Nieprawidłowe dane logowania!"});
    }

    const token = jwt.sign(
        {id: user.id, username: user.username, role: user.role},
        JWT_SECRET,
        {expiresIn: "1h"}
    );

    res.json({message: "Logowanie udane!", token});
});

router.get("/session", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({error: "Brak tokenu, proszę się zalogować!"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({user: decoded});
    } catch (err) {
        res.status(401).json({error: "Nieprawidłowy token!"});
    }
});

router.get("/profile", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({error: "Brak tokenu, proszę się zalogować!"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find((u) => u.id === decoded.id);

        if(!user) {
            return res.status(404).json({error: "Użytkownik nieznaleziony!"});
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error("Błąd weryfikacji tokenu:", err.message);
        res.status(401).json({error: "Nieprawidłowy token"});
    }
});

router.get("/orders", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({error: "Brak tokenu, proszę się zalogować!"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userOrders = orders
            .filter((order) => order.userId === decoded.id)
            .map((order) => {
                const orderProducts = order.products.map(product => ({
                    id: product.id,
                    quantity: product.quantity
                }));

                return {
                    id: order.id,
                    products: orderProducts,
                    totalPrice: order.totalPrice,
                    date: order.date
                };
            });

        res.json(userOrders);
    } catch (err) {
        console.error(err);
        res.status(401).json({error: "Nieprawidłowy token"});
    }
});

module.exports = router;