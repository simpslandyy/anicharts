var express = require('express');
var router = express.Router();
var Browse	= require('../handlers/browse');
var when	= require('when');
var extend	= require('util')._extend;

/* GET home page. */
router.get('/', function(req, res, next) {
	var currentSeason = {
		'season':'spring',
		'year': 2016
	}

	var best = {
		'year': currentSeason.year, 
		'season': currentSeason.season,
		'type': 'Tv',
		'status': 'Currently Airing',
		'sort': 'popularity',
		'is_popular': true
	}

	var worst = extend({}, best);
	worst['is_popular'] = false;

	var browse = new Browse();

	var promises = [];

	// Make calls to the handler
	var thisSeason = browse.getYearlyQuarter(currentSeason);
	var topBest = browse.getByPopularity(best);
	var topWorst = browse.getByPopularity(worst);

	// When all the promises have returned, render the homepage
	promises.push(topBest, topWorst, thisSeason);


	when.all(promises).then(function(results) {
		res.render('index', {
				title: 'AniStats',
				// header: 'Spring Into Anime!',
				header:'Title Here',
				best: results[0],
				worst: results[1],
				nowPlaying: results[2]
		});
	});

});


module.exports = router;
