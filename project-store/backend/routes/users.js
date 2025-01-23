const express = require("express");
const router = express.Router();
const users = require("../data/users.json");

router.get("/", (req, res) => {
    res.json(users);
});

router.get("/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).json({error: "Użytkownik nieznaleziony"});
    res.json(user);
});

router.post("/", (req, res) => {
    const {username, password, role} = req.body;

    if(!username || !password || !role) {
        return res.status(400).json({error: "Wszystkie pola są wymagane!"});
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        role
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;