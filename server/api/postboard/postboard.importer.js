'use strict';

var fs = require('fs');
var path = require('path');
//var unzip = require('unzip');
var unzip = require('node-unzip-2');
var temp = require("temp").track();
var PostboardSheet = require('./postboard.model').PostboardSheet;

var mongoose = require("mongoose");
var Grid = require('gridfs-stream');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);

var Q = require('q');

var readJSON = function (dirPath, filename, cb) {
  return fs.readFile(path.join(dirPath, filename), 'utf8', function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};

var noteFilename = function (noteContentUUID) {
  return 'note-' + noteContentUUID + '-enhanced.jpg';
};

var noteFilenamePrefix = function (postboardId) {
  return postboardId.toString() + "/";
};

exports.noteFilenameOnGrid = function (postboardId, noteContentUUID) {
  return noteFilenamePrefix(postboardId) + noteFilename(noteContentUUID);
}

exports.import = function (files, cb) {
  if (!files || !files.file) { cb("Upload failed", {}); return; }
  var file = files.file;
  console.log("Importing: ", path.resolve(file.path));
  if (file.extension !== '3csb') { cb("Must be a 3csb file", {}); return; }
  var postboardCreated = null;
  var filenamePrefix = null;
  temp.mkdir('postboard', function(err, dirPath) {
    if (err) return done(err);
    console.log('unpacking to ' + dirPath);
    fs.createReadStream(file.path).
      pipe(unzip.Extract({ path: dirPath })).
      on('close', function (err) {
        console.log('Unzip finished', err);
        readJSON(dirPath, 'metadata', function (err, metadata) {
          if (err) return done(err);
          metadata.sheetUUIDs.forEach(function (sheetUUID) {
            var filename = 'sheet-' + sheetUUID + '.json';
            readJSON(dirPath, filename, function (err, sheetJson) {
              if (err) return done(err);
              PostboardSheet.create(sheetJson, function (err, postboard) {
                if (err) return done(err);
                postboardCreated = postboard._id;
                console.log('imported sheet ' + postboard._id);

                filenamePrefix = noteFilenamePrefix(postboard._id);

                var promises = metadata.noteContentUUIDs.map(function (noteContentUUID) {
                  var deferred = Q.defer();
                  var filename = noteFilename(noteContentUUID);
                  var source = path.join(dirPath, filename);
                  var target = filenamePrefix + filename;
                  var writeStream = GridFS.createWriteStream({filename: target});
                  fs.createReadStream(source).pipe(writeStream);
                  writeStream.on('close', function (file) {
                    deferred.resolve(file);
                  });
                  return deferred.promise;
                });

                Q.all(promises)
                .then(function (files) {
                  files.forEach(function (file) {
                    console.log("stored file: " + file.filename);
                  });
                  done();
                })
                .fail(function (err) {
                  console.log("promise fail: ", err);
                  done(err);
                })
                .fin(function () {
                  temp.cleanupSync();
                });
              });
            });
          });
        });
      });
  });


  // var entries = [];
  // fs.createReadStream(file.path)
  // .pipe(unzip.Parse())
  // .on('entry', function (entry) {
  //   var fileName = entry.path;
  //     var type = entry.type; // 'Directory' or 'File'
  //     var size = entry.size;
  //     console.log("FILE: " + fileName + " type = " + entry.type);
  //     entries.push({filename: fileName, type: entry.type });

  //     entry.pipe(fs.createWriteStream('output/path'));

  //     entry.autodrain();
  //   });
  var cbCalled = false;
  function done(err) {
    if (!cbCalled) {
      if (err) {
        console.log(err);
        if (postboardCreated) {
          PostboardSheet.findById(postboardCreated).remove(function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('rolled back ' + postboardCreated);
            }
          });
        }
        if (filenamePrefix) {
          exports.removeFiles(postboardCreated, function () {});
        }
      }
      cb(err, {});
      cbCalled = true;
    }
  };
}

exports.removeFiles = function (postboardId, cb) {
  GridFS.files.find({filename: new RegExp(noteFilenamePrefix(postboardId) + ".*")}).toArray(function (err, files) {
    if (err) {
      console.log("removeFiles: err: ", err);
      cb(err, {});
    }
    var promises = files.map(function (file) {
      var deferred = Q.defer();
      GridFS.remove({filename: file.filename}, function (err) {
        if (err) {
          console.log("Error removing ", file.filename);
          deferred.reject(err);
        } else {
          console.log("Removed ", file.filename);
          deferred.resolve();
        }
      });
      return deferred.promise;
    });
    Q.all(promises)
    .then(function () {
      console.log("end: remove done");
      cb(null);
    })
    .fail(function (err) {
      console.log("end: remove fail", err);
      cb(err);
    })
  })
};



/*

{ file:
   { fieldname: 'file',
     originalname: 'board.3csb',
     name: '413f0529f25587746661c46ca18c781b.3csb',
     encoding: '7bit',
     mimetype: 'application/octet-stream',
     path: 'files/files/upload/413f0529f25587746661c46ca18c781b.3csb',
     extension: '3csb',
     size: 1857039,
     truncated: false,
     buffer: null }
   }

*/
