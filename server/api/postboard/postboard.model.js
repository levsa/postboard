'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostboardSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Postboard', PostboardSchema);