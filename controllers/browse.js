var util		   = require('util'),
  	request		   = require('request'),
  	Promise			= require('promise'),
  	_				= require('underscore'),
  	Authentication	= require('./oauth'),
  	credentials		= require('../helper').credentials;

function Browse() {
	this.auth = new Authentication(credentials);
	this.option = { auth : { 'bearer': null } };
	this.endpoint = 'browse/anime';
}

Browse.prototype.getYearlyQuarter = function(year, season, limit) {
	self = this;

	var query = util.format('%s%s?year=%s&season=%s', credentials.site, self.endpoint, year, season);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					var parse = JSON.parse(body);
					var body = limit ? _.first(parse, limit) : parse; //_.first(parse, 10);
					fulfill(body);
				})
			}, reject)
	})
}

Browse.prototype.getYearly = function(year, limit) {
	self = this;

	var query = util.format('%s%s?year=%s', credentials.site, self.endpoint, year);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					var parse = JSON.parse(body);
					var body = limit ?  _.first(parse, limit) : parse; //_.first(parse, 10);
					fulfill(body);
				})
			}, reject);
	})
}

Browse.prototype.getSeasonal = function(season, limit) {
	self = this;

	var query = util.format('%s%s?season=%s', credentials.site, self.endpoint, season);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					var parse = JSON.parse(body);
					var body = limit ?  _.first(parse, limit) : parse; //_.first(parse, 10);
					fulfill(body);
				})
			}, reject);
	})
}

Browse.prototype.getByPopularity = function(opt) {
	self = this;

	// if is_popular is true, then it will sort popularity score descending.
	var sortOrder = opt.is_popular ? '-desc' : "";
	var optBuild = util.format('year=%s&season=%s&type=%s&status=%s&sort=%s%s', 
		opt.year, opt.season, opt.type, opt.status, opt.sort, sortOrder);

	var query = util.format('%s%s?', credentials.site, self.endpoint, optBuild);

	return new Promise(function(fulfill, reject){
		self.auth 
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if(err) { reject(err) };
					var parse = JSON.parse(body);
					var body = opt.limit ?  _.first(parse, opt.limit) : parse; //_.first(parse, 10);
					fulfill(body);
				})
			}, reject);
	})
}


// Browse.prototype.getLeastPopular = function(options){

// }


module.exports = Browse;
 



