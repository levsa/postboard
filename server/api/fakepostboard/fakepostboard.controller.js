'use strict';

var _ = require('lodash');

// Get list of postboards
exports.index = function(req, res) {
  var postboards = [{
    "_id": "fakeid",

  }];
  return res.json(200, postboards);
};

// Get a single postboard
exports.show = function(req, res) {
};

// Creates a new postboard in the DB.
exports.create = function(req, res) {
};

// Updates an existing postboard in the DB.
exports.update = function(req, res) {
};

// Deletes a postboard from the DB.
exports.destroy = function(req, res) {
};

function handleError(res, err) {
  return res.send(500, err);
}
