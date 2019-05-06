var express = require('express');
var router = express.Router();
var fs = require("fs"); // fs - file system

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

  // var strPeople = fs.readFileSync("./public/data/people.json");
  // var people = JSON.parse(strPeople);
  var people = require("../public/data/people.json"); // get the json type text file contents.

  people.push({
    familyName,
    givenName,
    phoneNumber
  });

  var str = JSON.stringify(people, null, 2); // turn the acquired contents into string.
  fs.writeFileSync("./public/data/people.json", str); // delete the file's old content and rewrite with the updated.

  // TODO: save this data in the "people.json" file.
  res.json({
    success: true,
    message: "TODO !"
  });
});

// http://localhost:3000/users/ delete
router.delete('/delete', function(req, res, next) {
  var id = req.body.id;
  
  console.warn("Remove: ", id);

  // var strPeople = fs.readFileSync("./public/data/people.json");
  // var people = JSON.parse(strPeople);
  var people = require("../public/data/people.json"); // get the json type text file contents.

  var remainingPeople = people.filter(function(person) {
    return person.id != id;
  });

  var str = JSON.stringify(remainingPeople, null, 2); // turn the acquired contents into string.
  fs.writeFileSync("./public/data/people.json", str); // delete the file's old content and rewrite with the updated.

  res.json({
    success: true,
    message: "DONE."
  });
});

module.exports = router;
