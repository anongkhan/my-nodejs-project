module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    app.post("/products", products.findAll);
  };