const express = require("express");
const app = express();
const PORT = 3002;

const products = require("./data/products.json");

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
