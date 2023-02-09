const db = require("../models");
const Product = db.product;

// Get in the database the product's owner (userId).

const getOwner = (req, res, next) => {
    Product.findByPk(parseInt(req.params.productID, 10)).then(product => {
        if(!product) {req.ownerID = 0}
        else req.ownerID = product.dataValues.userId;
        next();
    })
}

module.exports = getOwner;