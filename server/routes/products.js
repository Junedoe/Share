const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');

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
router.post('/', isLoggedIn, (req, res, next) => {
    let _owner = req.user._id;
    console.log('req._use: ', req.user._id);

    let { name, subtitle, description, image } = req.body;
    Product.create({ name, subtitle, description, image, _owner })
        .then(product => {
            res.json({
                success: true,
                product
            });
        })
        .catch(err => next(err));
});
// Route to edit the product
router.get('/:id', isLoggedIn, (req, res, next) => {
    Product.findById(req.params.id)
        .then(products => {
            res.json(products);
        })
        .catch(err => next(err));
});

router.put('/:id', isLoggedIn, (req, res, next) => {
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

// Route to delete a product
router.delete('/:id', isLoggedIn, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Product.remove({ _id: req.params.id })
        .then(message => {
            return res.json({
                message: 'Product has been removed!'
            });
        })
        .catch(error => next(error));
});

module.exports = router;
