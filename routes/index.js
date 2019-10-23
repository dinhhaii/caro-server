const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const data = {
    username: req.user.username,
    gender: req.user.gender, 
    username: req.user.name
  }
  res.json(data);
});

module.exports = router;
