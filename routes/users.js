const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const mongoose = require('mongoose');
const constant = require('../utils/constant');
const bcrypt = require('bcrypt');

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
                token
            };
            return res.json(data);
        });
    })(req, res);

});

router.post('/register', (req, res) => {
    var { username, name, gender, password } = req.body;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds)
        .then(hash => {
            const user = new UserModel({
                _id: new mongoose.Types.ObjectId(),
                username: username,
                name: name,
                gender: gender,
                password: hash
            })

            user.save()
                .then(result => {
                    var { username, name, gender } = result;
                    const data = {
                        username: username,
                        name: name,
                        gender: gender
                    }
                    res.send(data);
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
        })


})

module.exports = router;
