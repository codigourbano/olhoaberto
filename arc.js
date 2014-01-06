
/**
 * WayArc Schema
 */

var WayArcSchema = new Schema({
	way: { type: Schema.ObjectId, ref: 'Way'},
	addressNumber: {
		start: Number,
		end: Number
	}
	reverse: Boolean, // refers to geometry topology
	lastHourAvgSpeed: Number
})

// statics
WayArcSchema.statics = {
	findNearest: function(point) {

	}
}

// methods

WayArcSchema.methods = {

}