const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const mongoose = require('mongoose');
const constant = require('../utils/constant');
const bcrypt = require('bcrypt');
var request = require('request');

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        // console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, { expiresIn: '30s' });
            const data = {
                name: user.name,
                username: user.username,
                gender: user.gender,
                picture: user.picture,
                token
            };
            return res.json(data);
        });
    })(req, res);

});

router.post('/register', (req, res) => {
    var { username, name, gender, password } = req.body;
    var url = `${req.protocol}://${req.get("host")}/images/no-avatar.png`;
    console.log(url);
    const saltRounds = 10;
    UserModel.findOne({ username }).then(user => {
        if (user) {
            res.json({ message: "Username has already existed" });
        } else {
            bcrypt.hash(password, saltRounds)
                .then(hash => {
                    const user = new UserModel({
                        _id: new mongoose.Types.ObjectId(),
                        username: username,
                        name: name,
                        gender: gender,
                        picture: url,
                        password: hash
                    })

                    user.save()
                        .then(result => {
                            var { username, name, gender, picture } = result;
                            const data = {
                                username: username,
                                name: name,
                                gender: gender,
                                picture: picture
                            }
                            res.send(data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })



})

// ==== GOOGLE ====
router.get('/google',
    passport.authenticate('google',
        {
            scope: ['profile', 'email']
        }
    )
);

router.get('/google/redirect', (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
        if (user) {
            const { gender, token, name, username, picture } = user;
            res.redirect(`${constant.URL_CLIENT}/login?username=${username}&gender=${gender}&name=${name}&picture=${picture}&token=${token}`);
        } else {
            return res.json({ message: "Error occured" })
        }
    })(req, res);
});

// ==== FACEBOOK ====
router.get('/facebook',
    passport.authenticate('facebook',
        {
            scope: ['email', 'user_photos']
        }
    )
);

router.get('/facebook/redirect', (req, res, next) => {
    passport.authenticate('facebook', { failureRedirect: '/login' }, (err, user) => {
        if (user) {
            const { gender, token, name, username, picture } = user;
            res.redirect(`${constant.URL_CLIENT}/login?username=${username}&gender=${gender}&name=${name}&picture=${picture}&token=${token}`);
        } else {
            return res.json({ message: "Error occured" })
        }
    })(req, res);
});

module.exports = router;
