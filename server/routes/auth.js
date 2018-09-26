const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:5dd05993-f98c-44c8-b580-99065c8587ba',
    key: '0d2faac0-0692-4169-a2da-123b4df9c55e:bhaRjVWs+lQkp8Y/9xxWFIBSImPWxWDx6cXNz/z0oWg='
});

router.post('/signup', (req, res, next) => {
    const { username, password, email, street, city, district } = req.body;
    // if (!username || !password || !email || !street || !city || !district) {
    //     res.status(401).json({ message: 'All fields must be filled out' });
    //     return;
    // }
    User.findOne({ username })
        .then(user => {
            if (user !== null) {
                res.status(401).json({ message: 'The username already exists' });
                return;
            }
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);
            const newUser = new User({ username, password: hashPass });

            return newUser.save();
        })
        .then(user => {
            chatkit
                .createUser({
                    id: user._id,
                    name: user.username
                })
                .then(user => {
                    console.log('Success', user);
                })
                .catch(err => {
                    console.log(err);
                });
            res.json(user);
        })
        .catch(err => {
            next(err);
        });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, err => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong' });
                return;
            }

            // We are now logged in (notice req.user)
            res.json(req.user);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'You are out!' });
});

module.exports = router;
