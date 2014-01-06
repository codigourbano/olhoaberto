
/**
 * Way Schema
 */

var WaySchema = new Schema({
  name: String,
  length: Number,
  geometry: { type: {type: String}, coordinates: []},
  arcs: {
    direct: { type: Schema.ObjectId, ref: 'WayArc'},
    reverse: { type: Schema.ObjectId, ref: 'WayArc'}
  }
})

WaySchema.methods = {
  updateSpeed: function(speed,direction,time) {
    movements = Movement.getLastHourForWay(self);
    _.each(movements, function(movement){

    })
    if (direction == 1) {
      self.lastHourSpeed.direct = speed;
    } else {
      self.lastHourSpeed.reverse = speed;
    }
    self.lastHourSpeed.expiresAt = time + 1 hour;
  },
  getDirectLastHourSpeed: function(){
    if (self.lastHourSpeed.expiresAt > Now()) {

    } 
  }
  getReverseLastHourSpeed
}
