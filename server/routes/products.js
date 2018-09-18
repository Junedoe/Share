const express = require('express');
const mongoose = require('mongoose');
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

// Route to one product (detail)
router.get('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Product.findById(req.params.id)
        .then(product => {
            res.json(product);
        })
        .catch(error => next(error));
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
// get by Id (for editing)
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(products => {
            res.json(products);
        })
        .catch(err => next(err));
});
// edit the product
router.put('/:id', (req, res, next) => {
    let { name, subtitle, description } = req.body;
    Product.findByIdAndUpdate(req.params.id, { $set: { name, subtitle, description } }, { new: true })
        .then(product => {
            res.json({
                success: true,
                product
            });
        })
        .catch(err => next(err));
});
//delete a product
router.delete('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Product.remove({ _id: req.params.id })
        .then(message => {
            return res.json({
                message: 'Coffee has been removed!'
            });
        })
        .catch(error => next(error));
});

module.exports = router;
