var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var familyName = req.body.familyName;
  var givenName = req.body.givenName;
  var phoneNumber = req.body.phoneNumber;
  
  console.warn("Add: ", req.body.givenName);
  res.json({
    success: true,
    message: "TODO !"
  });
});

module.exports = router;
