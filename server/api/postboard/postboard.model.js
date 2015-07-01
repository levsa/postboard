'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MetadataSchema = new Schema({
  captureUUIDs: [String],
  sheetUUIDs: [String],
  noteContentUUIDs: [String],
  version: {
    major: Number,
    minor: Number
  }
});

//var PointSchema = new Schema({
//  type: [Number],
//  validate: function (val) { return val && val.length < 2; }
//});

var NoteSchema = new Schema({
  isDigitalNote: Boolean,
  index: Number,
  noteUUID: String,
  contentUUID: String,
  centerX: Number,
  centerY: Number,
  layoutRotation: Number,
  layoutIndex: Number,
  enhancementMethod: String,
  positionInitialized: Boolean,
  UUID: String,
  board: String,
  layoutZOrder: Number,
  backgroundColor: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number
  },
  corners: {
    type: [Array],
    validate: function (val) { return val && val.length < 4; }
  }
});

var ClusterSchema = new Schema({
  height: Number,
  width: Number,
  positionX: Number,
  positionY: Number,
  layoutType: String,
  name: String,
  notes: [NoteSchema]
});

var SheetSchema = new Schema({
  creationDate: Date,
  UUID: String,
  name: String,
  clusters: [ClusterSchema]
});

module.exports = mongoose.model('PostboardSheet', SheetSchema);
