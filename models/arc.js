/*
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * WayArc Schema
 */

var ArcSchema = new Schema({
	_id: String,
	way: { type: String, ref: 'Way'},
	foward: {type: Boolean, default: true} 
})


mongoose.model('Arc', ArcSchema)