const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

exports.register = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then( hashedPassword => {
            const user = new UserModel({
                email: email,
                username: username,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            res.statusCode(201).json({ message: 'User created!', userId: result._id });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}