var express = require('express');
var router = express.Router();
var Browse	= require('../controllers/browse');
var when	= require('when');
var extend	= require('util')._extend;

/* GET home page. */
router.get('/', function(req, res, next) {
	var season = 'spring';
	var year = 2016;

	var optionsA = {
		'year': year,
		'season': season,
		'type': 'Tv',
		'status': 'Currently Airing',
		'sort': 'popularity',
		'limit': 10,
		'is_popular': true
	}

	var optionsB = extend({}, optionsA);
	optionsB['is_popular'] = false;

	var browse = new Browse();

	var promises = [];

	var topBest = browse.getByPopularity(optionsA);
	var topWorst = browse.getByPopularity(optionsB);
	var thisSeason = browse.getYearlyQuarter(year, season, null);

	promises.push(topBest, topWorst, thisSeason);


	when.all(promises).then(function(results) {
		res.render('index', {
				title: 'AniStats',
				header: 'Spring Into Anime!',
				best: results[0],
				worst: results[1],
				nowPlaying: results[2]
		});
	});

});


module.exports = router;
