const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', function(req, res, next) {

  res.json(req.user);
});

module.exports = router;
