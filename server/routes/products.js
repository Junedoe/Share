const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Route to get all products
router.get('/', (req, res, next) => {
    Product.find()
        .then(products => {
            res.json(products);
        })
        .catch(err => next(err));
});

// Route to add a product
router.post('/', (req, res, next) => {
    let { name, subtitle, description, image } = req.body;
    Product.create({ name, subtitle, description, image })
        .then(product => {
            res.json({
                success: true,
                product
            });
        })
        .catch(err => next(err));
});

module.exports = router;
