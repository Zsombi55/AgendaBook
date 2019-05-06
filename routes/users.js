var express = require('express');
var router = express.Router();
var fs = express.writeFileSync();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var familyName = req.body.familyName;
  var givenName = req.body.givenName;
  var phoneNumber = req.body.phoneNumber;
  
  console.warn("Add: ", familyName, givenName, phoneNumber);
  console.warn("Add: ", req.body.givenName);
  
  var people = require("../public/data/people.json");

  people.push({
    familyName,
    givenName,
    phoneNumber
  });

  var str = JSON.stringify(people, null, 2);
  fs = writeFileSync("./public/data/people.json", str);

  // TODO: save this data in the "people.json" file.
  res.json({
    success: true,
    message: "TODO !"
  });
});

module.exports = router;
