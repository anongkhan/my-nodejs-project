const Product = require("../models/product.model.js");

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error fetch products"
            });
        else res.send(data);
    });
};