var _ = require('underscore'),
async = require('async');

module.exports = {
	limit: function (entities, limit) {
		return _.first(entities, limit);
	},
	filterBy: function(entities, field) {
		result = [];
		debugger;
		async.eachSeries(entities, function(entity, next){
			if (entity[field] != null) {
				debugger;
				result.push(entity);
			}
			next();
		})	

		return result;
	}
}
