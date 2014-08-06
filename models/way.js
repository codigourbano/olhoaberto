/*
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Way Schema
 */

var WaySchema = new Schema({
  _id: String,
  name: String,
  geometry: { type: {type: String}, coordinates: []}
});

/**
 * Geo index
 **/

WaySchema.index({ loc: '2dsphere' });

// WaySchema.methods = {
//   updateSpeed: function(speed,direction,time) {
//     movements = Movement.getLastHourForWay(self);
//     _.each(movements, function(movement){

//     })
//     if (direction == 1) {
//       self.lastHourSpeed.direct = speed;
//     } else {
//       self.lastHourSpeed.reverse = speed;
//     }
//     self.lastHourSpeed.expiresAt = time + 1 hour;
//   },
//   getDirectLastHourSpeed: function(){
//     if (self.lastHourSpeed.expiresAt > Now()) {

//     } 
//   }
//   getReverseLastHourSpeed
// }

/*
  Statics
*/

WaySchema.statics = {
  
}

mongoose.model('Way', WaySchema)