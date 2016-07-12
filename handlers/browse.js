var util		   = require('util'),
  	request		   = require('request'),
  	Promise			= require('promise'),
  	Authentication	= require('./oauth'),
  	Model			= require('../models/model'),
  	credentials		= require('../helper').credentials;

function Browse() {
	this.auth = new Authentication(credentials);
	this.option = { auth : { 'bearer': null } };
	this.endpoint = 'browse/anime';
}

// Broswe.prototype.search = function() {

// 	var query = util.format('')

// 	return new Promise(function(fulfill, reject) {
// 		self.auth
// 			.setAccessToken()
// 			.done(function(result) {
// 				self.option.auth.bearer = result.token.access_token;
// 				request(query, )
// 			})
// 	})
// }

Browse.prototype.getYearlyQuarter = function(params) {
	self = this;

	var query = util.format('%s%s?year=%s&season=%s', credentials.site, self.endpoint, params.year, params.season);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					var parse = JSON.parse(body);
					var body = Model.limit(parse, 10);
					fulfill(body);
				})
			}, reject)
	})
}

Browse.prototype.getYearly = function(params) {
	self = this;
	var query = util.format('%s%s?year=%s', credentials.site, self.endpoint, params.year);
	console.log(query);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					var parse = JSON.parse(body);
					var body = Model.limit(parse, 10);
					fulfill(body);
				})
			}, reject);
	})
}

Browse.prototype.getSeasonal = function(params) {
	self = this;

	var query = util.format('%s%s?season=%s', credentials.site, self.endpoint, params.season);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					var parse = JSON.parse(body);
					var body = Model.limit(parse, 10);
					fulfill(body);
				})
			}, reject);
	})
}

Browse.prototype.getByPopularity = function(params) {
	self = this;

	// if is_popular is true, then it will sort popularity score descending.
	var sortOrder = params.is_popular ? '-desc' : "";
	var optBuild = util.format('year=%s&season=%s&type=%s&status=%s&sort=%s%s', 
		params.year, params.season, params.type, params.status, params.sort, sortOrder);

	var query = util.format('%s%s?', credentials.site, self.endpoint, optBuild);

	return new Promise(function(fulfill, reject){
		self.auth 
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if(err) { reject(err) };
					var parse = JSON.parse(body);
					var body = Model.limit(parse, 10);
					fulfill(body);
				})
			}, reject);
	})
}




module.exports = Browse;
 



