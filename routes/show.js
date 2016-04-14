var Show    = require('../controllers/show'),
	express	= require('express'),
	parent = express.Router();

var show = new Show();

parent.get('/', function(req, res){
	res.send('shows homepage');
});

// match a show id 
parent.get('/:id(\\d+)/', function(req, res){
	show
		.getShow(req.params.id)
		.then(function(result){
			res.send(result);
		})
		.catch(function(result){
			res.render('error', {})
		});
});


module.exports = parent;