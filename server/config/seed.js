/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var PostboardSheet = require('../api/postboard/postboard.model').PostboardSheet;
var fs = require('fs');
var path = require('path');

var mongoose = require("mongoose");
var Grid = require('gridfs-stream');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);
var PostboardImporter = require('../api/postboard/postboard.importer');
var Q = require('q');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

PostboardSheet.find({}).remove(function() {
  console.log("PostboardSheet all removed");
});

//GridFS.files.find({filename: new RegExp(".*")}).toArray(function (err, files) {
//  if (err) {
//      console.log("seed remove: err: ", err);
//  } else {
//    files.forEach(function (file) {
//      GridFS.remove({filename: file.filename}, function (err) {
//        if (err) {
//          console.log("Failed to remove " + file.filename);
//        } else {
//          console.log("Removed " + file.filename);
//        }
//      });
//    });
//  }
//});

mongoose.connection.once('open', function (cb) {
  var files = Q.defer();
  mongoose.connection.db.collection('fs.files').remove({}, function (err) {
    if (err) {
      console.log("Failed to remove grid files", err);
    } else {
      console.log("Removed grid files");
      files.resolve();
    }
  });

  var chunks = Q.defer();
  mongoose.connection.db.collection('fs.chunks').remove({}, function (err) {
    if (err) {
      console.log("Failed to remove grid chunks", err);
    } else {
      console.log("Removed grid chunks");
      chunks.resolve();
    }
  });

  Q.all([files.promise, chunks.promise])
  .then(function () {
    PostboardImporter.import({file: {
          path: path.resolve(__dirname, '../../testdata/board.3csb'),
          extension: '3csb'
        }
      },
      function (err, res) {
        if (err) {
          console.log("Seed import failed: ", err);
        } else {
          console.log("Seed import success: ", res);
        }
    });
  });
});

