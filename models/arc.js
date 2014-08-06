/*
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * WayArc Schema
 */

var ArcSchema = new Schema({
	way: { type: Schema.ObjectId, ref: 'Way'},
	foward: {type: Boolean, default: true} 
})


mongoose.model('Arc', ArcSchema)