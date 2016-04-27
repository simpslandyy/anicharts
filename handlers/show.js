var util		   = require('util'),
  	request		   = require('request'),
  	Authentication	= require('./oauth'),
  	credentials		= require('../helper').credentials,
  	Promise			= require('promise');

var express = require('express'),
	app		= express();

function Show() {
	this.auth = new Authentication(credentials);
	this.option = { auth : { 'bearer': null } };

}

Show.prototype.getShow = function(id) {
	self = this;
	self.endpoint = util.format('anime/%s', id);
	var query = util.format('%s%s', credentials.site, self.endpoint);

	return new Promise(function(fulfill, reject){
		self.auth
			.setAccessToken()
			.done(function(result){
				self.option.auth.bearer = result.token.access_token;
				request(query, self.option, function(err, res, body){
					if (err) { reject(err) };
					fulfill(body);
				})
			}, reject);
	});
};

Show.prototype.getActors = function(id) {
	self = this;
	self.endpoint = util.format('anime/%s/actors', id);
	var query = util.format('%s%s', credentials.site, self.endpoint);
}

Show.prototype.getCharacters = function(id) {
	self = this;
	self.endpoint = util.format('anime/%s/characters', id);
	var query = util.format('%s%s', credentials.site, self.endpoint);
}

Show.prototype.getGenres = function(id) {
	self = this;
	self.endpoint = util.format('anime/%s', id);
	var query = util.format('%s%s', credentials.site, self.endpoint);
}

Show.prototype.getNextAiring = function(id) {
	self = this;
	self.endpoint = util.format('anime/%s', id);
	var query = util.format('%s%s', credentials.site, self.endpoint);
}


module.exports = Show;