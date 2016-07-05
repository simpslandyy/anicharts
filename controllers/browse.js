var Browse	= require('../handlers/browse'),
	Show    = require('../handlers/show'),
	
	express	= require('express'),
	parent = express.Router(),
	child = express.Router({mergeParams: true});

// the parent will use this root, and the child is the handler.
parent.use('/:year/:season', child);

// create a new browse object
var browse = new Browse();

parent.get('/', function(req, res){
	res.send('Handler homepage');
	
})

// match a year, must be 4 digits
parent.get('/:year(\\d{4})/', function(req, res){
	browse
		.getYearly(req.params.year)
		.then(function(result){
			res.send(result);
		})
		.catch(function(result){
			res.render('error', {})
		});
})

// match a season (e.g. spring || winter || fall || summer)
parent.get('/:season([a-zA-Z]+)/', function(req, res){
	browse
		.getSeasonal(req.params.season)
		.then(function(result){
			res.send(result);
		})
		.catch(function(result){
			res.render('error', {})
		});
})

// root of :season
child.get('/', function(req, res){
	browse
		.getYearlyQuarter(req.params.year, req.params.season)
		.then(function(result){
			res.send(result);
		})
		.catch(function(result){
			res.render('error', {})
		});
})


module.exports = parent;
