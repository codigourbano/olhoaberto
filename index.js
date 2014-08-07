var 
	mongoose = require('mongoose'),
	fs = require('fs'),
	_ = require('underscore'),
	async = require('async'),
	SPTransAPI = require('sptrans.js');

var sptrans = new SPTransAPI({
  api_key: '7ec6172b29856483524db5f1ff99a051fc6ec7041954990ac61d25e56b720570'
})

 
require('./models/way');
require('./models/arc');
require('./models/route');
var Way, Arc, Route;
 
 
mongoose.connect('mongodb://localhost/olhoaberto')



/*
  Globals
 */

var osm = {
	nodes: {},
	ways: {},
	relations: {}
}

var routes = {};

/*
	Overpass call

http://overpass-turbo.eu/s/4tD

<osm-script output="json" >
  <union>
    <query type="relation">
      <has-kv k="network" v="SPTrans"/>
    </query>
    <recurse type="relation-node" into="nodes"/>
    <recurse type="relation-way"/>
    <recurse type="way-node"/>
    
  </union>
  <print/>
</osm-script>
*/



var elements = require('./sptrans.json').elements;

_.each(elements, function(e){

	if (e.type == 'node') {
		osm.nodes[e.id] = e;
	} else if (e.type == 'way') {
		osm.ways[e.id] = e;
	} else if (e.type == 'relation') {
		osm.relations[e.id] = e;
	}

})


// _.each(osm.ways, function(w){

// })


// var relations = _.filter(features, function(f){
// 	return (f.id.indexOf('relation') > -1);
// })

// var ways = _.filter(features, function(f){
// 	return f.id.indexOf('way') > -1;
// })

// console.log(osm.nodes);

// console.log(relations.length);
// console.log(ways.length);

function importWays(doneImportWays) {
	async.each(_.keys(osm.ways), function(way_id, doneEach){

		var osmway = osm.ways[way_id];
		var way = new Way({
			_id: way_id,
			name: osmway.tags.name
		});

		way.geometry = {type: 'LineString', coordinates: []};

		_.each(osmway.nodes, function(n){
			var node = osm.nodes[n];
			way.geometry.coordinates.push([node.lon, node.lat])
		})

		way.save(function(err){
			if (err) return doneEach(err);

			var fowardArc = new Arc({
				_id: way._id + 'f',
				way: way._id
			});

			var backwardArc = new Arc({
				_id: way._id + 'b',
				way: way._id,
				foward: false
			});


			fowardArc.save(doneEach);
		})

	}, doneImportWays);

}

function importOSMRoutes(doneImportRoutes) {
	async.each(_.keys(osm.relations), function(relation_id, doneEach){
		var 
			osmrelation = osm.relations[relation_id],
			tags = osmrelation.tags;

		if (tags['type'] == 'route') {
			var route = new Route({
				_id: relation_id,
				osm_relation: relation_id,
			});
			
			_.extend(route, tags);
			route.save(doneEach);
		} else doneEach();

	}, doneImportRoutes);
}

function importOsm(doneImport){

	importSPTransRoutes(doneImport);

}

function importSPTransRoutes(done){

	sptrans.getAllRoutes(function(err, data){	
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
		}, done);
	});
}


function clearDb(doneClearDb) {
	Way.remove(function(err){
		if (err) return doneClearDb(err);
		Arc.remove(function(err){
			if (err) return doneClearDb(err);
			Route.remove(function(err){
				if (err) return doneClearDb(err);
				doneClearDb();
			});
		});
	});
}


mongoose.connection.on('open', function(){


	Way = mongoose.model('Way');
	Arc = mongoose.model('Arc');
	Route = mongoose.model('Route');

	async.series([clearDb, importOsm], function(err){
		if (err) console.log(err);
		mongoose.connection.close();	
	});
});