var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res);
  res.send("SEARCH HOMEPAGE");
});

module.exports = router;
