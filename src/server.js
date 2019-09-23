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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./dist/persona-site'));
app.disable('etag');

app.use(function (req, res, next) {
	// res.header("Access-Control-Allow-Origin",
	//   "http://localhost:4200");
	// res.header("Access-Control-Allow-Origin",
	//   "https://soccer-tracker.herokuapp.com","");

	var allowedOrigins = ['https://intense-sea-81561.herokuapp.com', 'http://intense-sea-81561.herokuapp.com', 'intense-sea-81561.herokuapp.com', 'http://localhost:4200'];
	var origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
		res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	next();
});

var Schema = mongo.Schema;

var dataSchema = new Schema({
	hotTemperature: {type: Number},
	hotHumidity: {type: Number},
	coldTemperature: {type: Number},
	coldHumidity: {type: Number},
	timestamp: {type: Date}
}, {versionKey: false});

var model = mongo.model('database-readings', dataSchema, 'readings');


app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname,'./dist/personal-site/index.html'));
});

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
		.limit(1500)
		.then(reviews => {
			res.send(reviews)
		});
});

app.get("/api/getData3Days", function (req, res) {
	model.find()
		.sort({time: -1})
		.limit(4500)
		.then(reviews => {
			res.send(reviews)
		});
});


app.listen(process.env.PORT || 5000);

