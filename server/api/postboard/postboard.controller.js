'use strict';

var _ = require('lodash');
var PostboardSheet = require('./postboard.model').PostboardSheet;
var PostboardImporter = require('./postboard.importer');

var multer  = require('multer');

exports.createUploadHandler = multer({
  dest: './files/files/upload',
  limits: {
    fieldNameSize: 999999999,
    fieldSize: 999999999
  },
  includeEmptyFields: true,
  onError: function (error, next) {
    console.log(error);
    next(error);
  },
  onFileUploadStart: function(file) {
    console.log('Starting ', file);
  },
  onFileUploadData: function(file, data) {
    console.log('Got a chunk of data!');
  },
  onFileUploadComplete: function(file) {
    console.log('Completed file!');
  },
  onParseStart: function() {
    console.log('Starting to parse request!');
  },
  onParseEnd: function(req, next) {
    console.log('Done parsing!');
    next();
  }
});


// Get list of postboards
exports.index = function(req, res) {
  PostboardSheet.find(function (err, postboards) {
    if(err) { return handleError(res, err); }
    return res.json(200, postboards);
  });
};

// Get a single postboard
exports.show = function(req, res) {
  PostboardSheet.findById(req.params.id, function (err, postboard) {
    if(err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }
    return res.json(postboard);
  });
};

// Creates a new postboard in the DB.
exports.create = function(req, res) {
  console.info("CREATE: ", req.body);
  console.info("CREATE: ", req.files);
  // PostboardSheet.create(req.body, function(err, postboard) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, postboard);
  // });
  PostboardImporter.import(req.files, function (err, imported) {
    if(err) { return res.send(400, err); }
    console.log("IMPORTED:", imported);
    return res.json(201, imported);
  });
};

// Updates an existing postboard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PostboardSheet.findById(req.params.id, function (err, postboard) {
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
  PostboardSheet.findById(req.params.id, function (err, postboard) {
    if(err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }
    postboard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.indexNotes = function(req, res) {
  PostboardSheet.findById(req.params.id, function (err, postboard) {
    if(err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }
    return res.json(postboard.clusters[0].notes);
  });
};

exports.showNote = function(req, res) {
  PostboardSheet.findById(req.params.id, function (err, postboard) {
    if(err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }

    var note = postboard.clusters[0].notes.id(req.params.noteId);
    if(!note) { return res.send(404); }
    return res.json(note);
  });
};

// Updates an existing postboard in the DB.
exports.updateNote = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PostboardSheet.findById(req.params.id, function (err, postboard) {
    if (err) { return handleError(res, err); }
    if(!postboard) { return res.send(404); }

    var note = postboard.clusters[0].notes.id(req.params.noteId);
    if(!note) { return res.send(404); }

    _.merge(note, req.body);

    postboard.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, postboard);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
