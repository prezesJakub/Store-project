const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

const getProducts = () => {
    const data = fs.readFileSync(productsFilePath, "utf-8");
    return JSON.parse(data);
};

router.get("/", (req, res) => {
    const products = getProducts();
    res.json(products);
});

router.get("/:id", (req, res) => {
    const productId = Number(req.params.id);
    const products = getProducts();
    const product = products.find((p) => p.id === productId);
    if (!product) {
        return res.status(404).json({error: "Produkt nieznaleziony"});
    }
    res.json(product);
});

module.exports = router;