const express = require('express');
const { isLoggedIn, imTheUser } = require('../middlewares');
const Product = require('../models/Product');
const User = require('../models/User');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../configs/cloudinary'); //???

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'my-images',
    allowedFormats: ['jpg', 'png', 'gif'],
    transformation: [
        {
            angle: 0
        }
    ]
});

const parser = multer({ storage });

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

router.patch('/user', isLoggedIn, parser.single('picture'), (req, res, next) => {
    let { firstname, surname, email, street, number, postalCode, city, district } = req.body;
    let pictureUrl = req.user.pictureUrl;
    if (req.file) pictureUrl = req.file.secure_url;
    User.findByIdAndUpdate(
        req.user._id,
        {
            firstname,
            surname,
            email,
            street,
            number,
            postalCode,
            city,
            district,
            pictureUrl
        },
        { new: true }
    )
        .then(user => {
            console.log('NEW USER IN BE', user);
            res.json({
                success: true,
                user: user
            });
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
