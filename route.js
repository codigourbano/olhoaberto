
/**
 * Route Schema
 */

var RouteSchema = new Schema({
  id: String,
  osm_info: {
    relation: Number,
    lastValidVersion: Number
  },
  arcs: [{
    way: {type: Schema.ObjectId, ref: 'Arc'},
    reverse: Boolean
  }]
})


RouteSchema.methods = {
  getNearestArcFromPoint: function(p){
    Way.where.findNearest(p,);
  },
  getAffectedArcsByVector: function(vector){
    var firstWay = getNearestWayFromPoint(vector.p0)
        lastWay = getNearestWayFromPoint(vector.p1);

    // get firstWay index in route

    // get lastWay index in route

    // using these indexes, extract all affected ways

    // return ways
  },
  updateSpeedFromVector: function(vector) {
    vector.waysAffected = self.getAffectedWaysByVector(vector)

    _.each()
  }
}