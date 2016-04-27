var _ = require('underscore'),
async = require('async');

module.exports = {
	limit: function (body, limit) {
		return _.first(body, limit);
	},
	filterBy: function(body, field) {
		result = [];
		async.eachSeries(body, function(series, next){
			if (series[field] != null) {
				result.push(series);
			}
			next();
		})	
	}
}