var 
	mongoose = require('mongoose'),
	fs = require('fs'),
	_ = require('underscore'),
	async = require('async');
 
require('./models/way');
require('./models/arc');
var Way, Arc;
 
 
mongoose.connect('mongodb://localhost/olhoaberto')



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

/*
  get data
 */

var _ = require('underscore');

var osm = {
	nodes: {},
	ways: {},
	relations: {}
}


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
	Way.remove(function(err){
		if (err) return doneImportWays();

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

			var fowardArc = new Arc({
				way: way
			});

			var backwardArc = new Arc({
				way: way,
				foward: false
			});

			async.series([way.save, fowardArc.save, backwardArc.save, doneEach]);

		}, doneImportWays);
	
	})

}

function importRoutes(doneImportRoutes) {
}

function importOsm(doneImport){

	importWays(doneImport);

// 	var way = osm.ways['293930072'];

// //	var way = osm.ways[0];

// 	way.geometry = {type: 'LineString', coordinates: []};

// 	_.each(way.nodes, function(n){
// 		var node = osm.nodes[n];
// 		way.geometry.coordinates.push([node.lon, node.lat])
// 	})

// 	console.log(JSON.stringify(way.geometry.coordinates));

// 	doneImport();

	// Way.remove({}, function(err){

	// })
}



mongoose.connection.on('open', function(){


	Way = mongoose.model('Way');
	Arc = mongoose.model('Arc');

	importOsm(function(err){
		if (err) console.log(err);
		mongoose.connection.close();	
	})
});