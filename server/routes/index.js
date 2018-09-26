const express = require('express');
const { isLoggedIn, imTheUser } = require('../middlewares');
const Product = require('../models/Product');
const User = require('../models/User');

const router = express.Router();

router.get('/user-profile', isLoggedIn, (req, res, next) => {
    Product.find({ _owner: req.user._id })
        .then(userProducts => {
            res.json(userProducts);
        })
        .catch(error => next(error));
});

router.get('/user/:id', imTheUser, (req, res, next) => {
    Product.find({ _owner: req.params.id })
        .populate('_owner')
        .then(userProducts => {
            res.json(userProducts);
        })
        .catch(error => next(error));
});

router.get('/user', isLoggedIn, (req, res, next) => {
    User.findById(req.user._id)
        .then(user => {
            res.json(user);
        })
        .catch(error => next(error));
});

module.exports = router;
