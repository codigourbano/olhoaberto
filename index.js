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

function importRoutes(doneImportRoutes) {
}

function importOsm(doneImport){

	importWays(doneImport);

}


function clearDb(doneClearDb) {
	Way.remove(function(err){
		if (err) return doneClearDb(err);
		Arc.remove(function(err){
			if (err) return doneClearDb(err);
			doneClearDb();
		})
	})
}


mongoose.connection.on('open', function(){


	Way = mongoose.model('Way');
	Arc = mongoose.model('Arc');

	async.series([clearDb, importOsm], function(err){
		if (err) console.log(err);
		mongoose.connection.close();	
	});
});