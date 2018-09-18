const express = require('express');
const User = require('../models/User');
const User = require('../models/Product');
const router = express.Router();

router.get('/product-detail', isLoggedIn, (req, res, next) => {
    res.json({
        userProfile: 42,
        user: req.user
    });
});

module.exports = router;
