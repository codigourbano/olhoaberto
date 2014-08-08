/**
 * Module dependencies.
 */

var 
	async = require('async'),
	mongoose = require('mongoose'),
	Route = mongoose.model('Route'),
	SPTransAPI = require('sptrans');

// config
var env = process.env.NODE_ENV || 'development'
  , config = require('../config/config')[env]

// create SPTrans client
var SPTransClient = new SPTransAPI({
  api_key: config.SPTransAPIKey
});

/**
 * Sync OpenStreetMap data
 */

exports.osm = function(req, res){
  res.send('osm');
}

/**
 * Sync SPTrans data
 */

exports.sptrans = function(req, res){
	Route.remove(function(err){
		if (err) return res.send(err);
		
		SPTransClient.getAllRoutes(function(err, data){	
			if (err) return done(err);
			async.each(data, function(row, doneEach){
				var route = new Route({
					_id: row["CodigoLinha"],
					circular: row["Circular"],
					ref: row["Letreiro"],
					from: row["Letreiro"] == "1" ? row["DenominacaoTPTS"] : row["DenominacaoTSTP"], 
					to: row["Letreiro"] == "1" ? row["DenominacaoTSTP"] : row["DenominacaoTPTS"], 
					type: row["Tipo"]
				});
				route.save(doneEach);
			}, function(err){
				if (err) return res.send(err);
				res.send('sucess');
			});
		});

	});
}