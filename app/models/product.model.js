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

module.exports = Product;