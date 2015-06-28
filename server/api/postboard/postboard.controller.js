'use strict';

var _ = require('lodash');
var Postboard = require('./postboard.model');

// Get list of postboards
exports.index = function(req, res) {
  Postboard.find(function (err, postboards) {
    if(err) { return handleError(res, err); }
    return res.json(200, postboards);
  });
};

// Get a single postboard
exports.show = function(req, res) {
  Postboard.findById(req.params.id, function (err, postboard) {
    if(err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }
    return res.json(postboard);
  });
};

// Creates a new postboard in the DB.
exports.create = function(req, res) {
  Postboard.create(req.body, function(err, postboard) {
    if(err) { return handleError(res, err); }
    return res.json(201, postboard);
  });
};

// Updates an existing postboard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Postboard.findById(req.params.id, function (err, postboard) {
    if (err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }
    var updated = _.merge(postboard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, postboard);
    });
  });
};

// Deletes a postboard from the DB.
exports.destroy = function(req, res) {
  Postboard.findById(req.params.id, function (err, postboard) {
    if(err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }
    postboard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}