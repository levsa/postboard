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
    type: [Array[Number]],
    validate: function (val) {
      if (val && val.length === 4) {
        for (var i=0; i<4; i++) {
          if (!val[i] || val[i].length !== 2) {
            console.log("Error in corner number " + (i + 1) + ", corner val=" + val);
          }
        }
      } else {
        console.log("Error in corner val=" + val);
      }
    }
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
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  editableBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  clusters: [ClusterSchema]
});

module.exports = {
  'PostboardSheet': mongoose.model('PostboardSheet', SheetSchema),
  'PostboardNote': mongoose.model('PostboardNote', NoteSchema)
}


