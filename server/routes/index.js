const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

router.get('/userProfile', isLoggedIn, (req, res, next) => {
    res.json({
        userProfile: 42,
        user: req.user
    });
});

module.exports = router;