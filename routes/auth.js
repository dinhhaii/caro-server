const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const authController = require('../controllers/auth');

router.put('/register', 
    // [
    // body('email')
    //     .isEmail()
    //     .withMessage('Please enter a valid email.')
    //     .custom((value, { req }) => {
    //         return UserModel.findOne({email: value}).then(userDoc => {
    //             if(userDoc) {
    //                 return Promise.reject('Email has already exists!');
    //             }
    //         })
    //     })
    //     .normalizeEmail(),
    // body('password')
    //     .trim()
    //     .isLength({min: 5}),
    // body('username')
    //     .trim()
    //     .not()
    //     .isEmpty()
    // ],
    authController.register
);

module.exports = router;