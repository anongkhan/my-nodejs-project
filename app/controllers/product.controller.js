const e = require("express");
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
exports.create = (req, res) => {
    // Validate request
    if (! req.body.pro_name || ! req.body.price || ! req.body.cat_id) {
        res.status(400).send({message: "Product name, price and category ID cannot be empty"});
        return;
    }

    // Create a Product object
    const newProduct = new Product({
        pro_name: req.body.pro_name,
        price: req.body.price,
        cat_id: req.body.cat_id
    });

    // Save Product in the database
    Product.create(newProduct, (error, data) => {
        if (error) {
            res.status(500).send({message: err.message || "Some error occurred while creating the Product."});
    } else{
        res.status(201).send(data);
    }
    });
};
exports.update = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: "Data to update cannot be empty"});
        return;
    }
    // Update the Product in the database
    Product.updateById(req.params.id, req.body, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({message: `Product with id ${req.params.id} not found.`});
            } else {
                res.status(500).send({message: 'Error updating Product with id ${req.params.id}'});
            }
        } else {
            res.send(data);
        }
    });
};

// controller for deleting a product
exports.delete = (req, res) => {
    // delete the product from the database
    Product.revome(req.params.id, (error, data) => {
        if (error ) {
            if (error.kind === "not_found") {
                res.status(404).send({message: `Product with id ${req.params.id} not found.`});
            } else {
                res.status(500).send({message: 'Could not delete Product with id ${req.params.id}'});
            }
        } else {
            res.send({message: "Product was deleted successfully!"});
        }
    });
};