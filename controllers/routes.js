/**
 * Module dependencies.
 */

var 
	mongoose = require('mongoose'),
	Route = mongoose.model('Route')


/**
 * Load
 */

exports.load = function(req, res, next, id){

	Route.load(id, function (err, route) {
		if (err) return next(err)
		if (!route) return next(new Error('not found'))
		req.routeDoc = route
		next()
	})
}

/**
 * List
 */

exports.index = function(req, res){

	var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
	var perPage = 30
	var options = {
		perPage: perPage,
		page: page
	}

	Route.list(options, function(err, routes) {
		if (err) return res.render('500')
		Route.count().exec(function (err, count) {
			res.render('routes/index', {
				routes: routes,
				page: page + 1,
				pages: Math.ceil(count / perPage)
			})
		})
	})
}

/**
 * show
 */

exports.show = function(req, res){
	res.render('routes/show', {
		route: req.routeDoc
	});
}