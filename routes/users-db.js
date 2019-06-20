var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'agenda'
});

/* GET "users" listing. */
router.get('/', function(req, res, next) {
  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM contacts`;
    
    connection.query(sql, (err, results) => {
      res.json(results);

      connection.release();
    });
  });
});

// http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var familyName = req.body.familyName;
  var givenName = req.body.givenName;
  var phoneNumber = req.body.phoneNumber;
  
  console.warn("Add: ", familyName, givenName, phoneNumber);
  
  pool.getConnection((err, connection) => {
    const sql = `INSERT INTO contacts 
      (id, familyName, givenName, phoneNumber)
      VALUES (NULL, "${familyName}", "${givenName}", "${phoneNumber}")`;
      
    console.log(sql);
    connection.query(sql, (err, result) => {
      const id = result.insertId;
      res.json({
        success: true,
        id,
        message: "Done!"
      });
      
      connection.release();
    });
  });
});

// http://localhost:3000/users/update
router.put('/update', function(req, res, next) {
  var id = req.body.id;
  var familyName = req.body.familyName;
  var givenName = req.body.givenName;
  var phoneNumber = req.body.phoneNumber;
  
  console.warn("Update: ", id, familyName, givenName, phoneNumber);
  
  var id = req.body.id;
    
  console.warn("Remove: ", id);
  
  pool.getConnection((err, connection) => {
    const sql = `UPDATE contacts 
    SET familyName = "${familyName}", givenName = "${givenName}", phoneNumber = "${phoneNumber}"
    WHERE id = ${id}`;
        
    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        message: "Done!"
      });
        
      connection.release();
    });
  });
});

// http://localhost:3000/users/delete
router.delete('/delete', function(req, res, next) {
  var id = req.body.id;
  
  console.warn("Remove: ", id);

  pool.getConnection((err, connection) => {
    const sql = `DELETE FROM contacts WHERE id = ${(id)}`;
      
    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        message: "Done!"
      });
      
      connection.release();
    });
  });
});

module.exports = router;
