const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user', (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
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
