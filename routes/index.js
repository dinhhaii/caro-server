const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const constant = require('../utils/constant');
const jwtExtension = require('jwt-simple');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const data = {
    username: req.user.username,
    gender: req.user.gender, 
    name: req.user.name,
    picture: req.user.picture,
    type: req.user.type
  }
  res.json(data);
});

router.get('/auth/facebook', function(req, res, next) {
  const query = req.query;
  if (query.token) {
    const data = jwtExtension.decode(query.token, constant.JWT_SECRET);
    res.json(data);
  }
  res.json({message: "Invalid token"});
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect(constant.URL_CLIENT);
});

module.exports = router;
