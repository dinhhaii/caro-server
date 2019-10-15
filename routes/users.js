const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
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
            const token = jwt.sign(user.toJSON() , 'jwt_secret');
            console.log(token);
            return res.json({ user, token });
        });
    })(req, res);

});

router.post('/register', (req, res) => {
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  })
  
  user.save()
    .then( result => {
      console.log(result);
      res.send(result);
    })
    .catch( err => console.log(err));

})


module.exports = router;
