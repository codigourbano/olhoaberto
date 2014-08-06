/*
 * Module dependencies
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Way Schema
 */

var WayArcSchema = new Schema({
	way: { type: Schema.ObjectId, ref: 'Way'},
	reverse: Boolean,
	length,
	lastHourAvgSpeed: Number
})