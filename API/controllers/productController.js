const db = require("../models");
const Product = db.product;
const mw = require("../middleware");
const { Op } = require("sequelize");

exports.info = (req, res) => {
    Product.findByPk(req.params.productID).then(product => {
        if (product === null) { res.status(404).json({ message: 'Product not found' }) }
        else res.status(200).json(product);
    });
}

exports.list = (req, res) => {
    Product.findAll({
        where: {
            userId: req.params.userID ?? { [Op.gt]: 0 }
        }
    }).then(products => {
        res.status(200).json(products);
    });
}

exports.create = (req, res) => {
    Product.create({
        name: req.body.name,
        price: parseFloat(req.body.price, 10),
        description: req.body.description,
        image: req.body.image,
        userId: req.userID
    }).then(change => {
        res.status(200).json({ message: 'Product created successfully.' });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

exports.update = (req, res) => {
    // Check permissions
    if (req.userID !== req.ownerID && req.role !== 'admin') {
        return res.status(403).json({ message: "Permission needed." });
    }
    // Update entry in database
    Product.update({
        name: req.body.name,
        price: parseFloat(req.body.price, 10),
        description: req.body.description,
        image: req.body.image
    }, {
        where: {
            id: parseInt(req.params.productID, 10)
        }
    }).then(change => {
        if (change[0] === 0) res.status(404).json({ message: "Product not found." })
        else if (change[0] === 1) res.status(200).json({ message: 'Product updated successfully.' })
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}

exports.delete = (req, res) => {
    // Check permissions
    if (req.userID !== req.ownerID && req.role !== 'admin') {
        return res.status(403).json({ message: "Permission needed." });
    }

    // Delete entry in database
    Product.destroy({
        where: {
            id: parseInt(req.params.productID, 10)
        }
    }).then(change => {
        if (change === 0) res.status(404).json({ message: "Product not found." })
        else if (change === 1) res.status(200).json({ message: 'Product deleted successfully.' })
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}