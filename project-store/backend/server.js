const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 5001;

const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Backend działa!");
});

app.listen(PORT, () => {
    console.log(`Serwer działa teraz na porcie ${PORT}`);
});