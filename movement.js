
/**
 * Movement Schema
 */

var MovementSchema = new Schema({
  route: { type: Schema.ObjectId, ref: 'Route'},
  vehicle: { type: Schema.ObjectId, ref: 'Vehicle'},
  affectedSegments: [{ 
      way: {type: Schema.ObjectId, ref: 'Way'},
      direction: Number // 1 or -1
  }],
  p0: { type: {type: String}, coordinates: []},
  p1: { type: {type: String}, coordinates: []},
  time: {
    start: Date,
    end: Date
  },
  duration: Number, // in secs
  length: Number, // in meters
  avgSpeed: Number, // in km/h
  isConsistent: Boolean
})

/**
 * Pre-save hook
 */

MovementSchema.before_save = {
  self.affectedSegments = self.route.getAffectedWaysByMovement();
  
  // length of Movement projection on route
  self.length = 0;
  _.each(self.affectedSegments, function(segment){
    self.length += segment.length;
  })
  
  // movement duration
  self.duration = self.time.end - self.time.start;

  // speed 
  self.avgSpeed = (self.length / 1000) / (self.duration / 3600)

}

/**
 * Post-save hook
 */

MovementSchema.after_save = {
  _.each(self.affectedSegments, function(segment) {
    segment.way.updateSpeed(self.speed, self.direction, self.time.end)
  })
}
