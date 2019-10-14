var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const data = req.query;
  res.json(data);
});

module.exports = router;
