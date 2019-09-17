var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://heroku_gw4glr93:ml58ck88lvnt0olpj14v9o4f3h@ds033163.mlab.com:33163/heroku_gw4glr93", function(err, response){
  if(err){console.log(err);}
  else{console.log("Connected to mongo DB")}
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

var Schema = mongo.Schema;

var dataSchema = new Schema({
  temperature: {type: Number},
  humidity: {type: Number},
  timestamp: {type: Date}
  }, {versionKey: false});

var model = mongo.model('database-readings', dataSchema, 'readings');

app.get("/api/getData", function(req,res){
  model.find()
    .sort({_id: -1})
    .limit(10)
    .then(reviews => {
      console.log(reviews)
      res.send(reviews)
    });});


app.listen(8081, function(){
  console.log('App listening on port 8081')
});
