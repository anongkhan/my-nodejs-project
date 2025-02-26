const sql = require("./db.js");

// constructor
const Product = function (product) {
    this.pro_name = product.pro_name;
    this.price = product.price;
    this.cat_id = product.cat_id;
};

// fetch all data
Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
};
Product.create = (newProduct, result) => {
    console.log(newProduct);
    sql.query("INSERT INTO products SET ?", newProduct, (error, response) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        result(null, { id: response.insertId, ...newProduct });
    });
};
Product.updateById = (id, updateProduct, result) => {
    sql.query("UPDATE products SET ? WHERE id = ?", [updateProduct, id], (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }
        if (response.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id, ...updateProduct });
    });
};
Product.revome = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, response);
    });
};
module.exports = Product;