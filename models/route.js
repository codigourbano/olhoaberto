/*
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Route Schema
 */

var RouteSchema = new Schema({
  _id: String,
  osm_relation: Number,
	type: String,
	name: String,
	ref: String,
	from: String,
	to: String,
	color: String,
	colour: String,
	network: String,
	operator: String,
	public_transport: String,
	route: String,
  arcs: [{type: Schema.ObjectId, ref: 'Arc'}]
})


// RouteSchema.methods = {
//   getNearestArcFromPoint: function(p){
//     Way.where.findNearest(p,);
//   },
//   getAffectedArcsByVector: function(vector){
//     var firstWay = getNearestWayFromPoint(vector.p0)
//         lastWay = getNearestWayFromPoint(vector.p1);

//     // get firstWay index in route

//     // get lastWay index in route

//     // using these indexes, extract all affected ways

//     // return ways
//   },
//   updateSpeedFromVector: function(vector) {
//     vector.waysAffected = self.getAffectedWaysByVector(vector)

//     _.each()
//   }
// }


mongoose.model('Route', RouteSchema)