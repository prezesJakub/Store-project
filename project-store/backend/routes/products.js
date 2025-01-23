const express = require("express");
const router = express.Router();
const products = require("../data/products.json");

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) 
        return res.status(404).json({error: "Produkt nieznaleziony"});
    res.json(product);
});

module.exports = router;