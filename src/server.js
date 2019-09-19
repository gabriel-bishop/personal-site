var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://heroku_gw4glr93:ml58ck88lvnt0olpj14v9o4f3h@ds033163.mlab.com:33163/heroku_gw4glr93", function (err, response) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to mongo DB")
	}
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
})

var Schema = mongo.Schema;

var dataSchema = new Schema({
	hotTemperature: {type: Number},
	hotHumidity: {type: Number},
	coldTemperature: {type: Number},
	coldHumidity: {type: Number},
	timestamp: {type: Date}
}, {versionKey: false});

var model = mongo.model('database-readings', dataSchema, 'readings');

app.get("/api/getDataHour", function (req, res) {
	model.find()
		.sort({time: -1})
		.limit(60)
		.then(reviews => {
			console.log(reviews)
			res.send(reviews)
		});
});

app.delete("/api/truncate", function(req, res){
	model.remove({}, function(err) {
		console.log('collection removed')
	});
})

app.get("/api/getRecentReading", function (req, res) {
	model.find()
		.sort({time: -1})
		.limit(2)
		.then(reviews => {
			console.log(reviews)
			res.send(reviews)
		});
});


app.get("/api/getDataSixHours", function (req, res) {
	model.find()
		.sort({time: -1})
		.limit(380)
		.then(reviews => {
			res.send(reviews)
		});
});

app.get("/api/getDataTwelveHours", function (req, res) {
	model.find()
		.sort({time: -1})
		.limit(740)
		.then(reviews => {
			res.send(reviews)
		});
});

app.get("/api/getData24Hours", function (req, res) {
	model.find()
		.sort({time: -1})
		.limit(1450)
		.then(reviews => {
			res.send(reviews)
		});
});


app.listen(8081, function () {
	console.log('App listening on port 8081')
});
