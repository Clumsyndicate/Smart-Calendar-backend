var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    "classList": [
      "Math 33A",
      "Math 33B",
      "Math 32A",
      "Math 32B",
      "CS 31",
      "CS 32",
      "CS 33",
      "CS 35L",
      "CS 111",
      "CS 180",
      "CS 118",
      "Chin 40",
      "Chin 50"
    ]
  })
});

module.exports = router;
