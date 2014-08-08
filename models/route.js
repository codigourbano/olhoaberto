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
	osm_match: {type: Number, ref: 'Relation'},
	osm_posible_matches: [{type: Number, ref: 'Relation'}],
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


/**
 * Statics
 */

RouteSchema.statics = {

  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}


mongoose.model('Route', RouteSchema)