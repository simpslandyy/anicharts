var Promise	  = require('promise');

function Authentication(credentials) {
	oauth2 = require('simple-oauth2')(credentials);
};

Authentication.prototype.setAccessToken = function() {
	return new Promise(function(fulfill, reject){
		var token;
		var tokenConfig = {};

		oauth2.client
			.getToken(tokenConfig)
			.done(function saveToken(result) {
				try {
					// create a token object
					token = oauth2.accessToken.create(result);					
					fulfill(token);
				} catch(e) {
					reject(e);
				}
			}, reject);
	});
	
};

module.exports = Authentication;