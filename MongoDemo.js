var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient; 
var url = 'mongodb://127.0.0.1:27017/trgdb';
var db;
MongoClient.connect(url, function(err, client) { 
      if (err) return console.log(err) 
      console.log("connection successful")
      db = client.db('trgdb');
});

app.get('/MongoForm.html', function (req, res) {
     res.sendFile('public/MongoForm.html' , { root : __dirname});
});

app.post('/submit-data', function (req, res) {
     res.send(req.body.name + ' Submitted Successfully!');
	db.collection('userdata').insertOne(req.body, function(err, result){   //"userdata" is name of the collection
          if (err) return console.log(err);
          console.log('saved to database');
  });
  
});

app.get('/GetDetails', function (req, res) {
   db.collection('userdata').find().toArray((err, results) => {
     res.send(results);  //result is a json object
   });
});
app.listen(3030);
