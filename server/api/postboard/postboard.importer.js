'use strict';

var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');
//var unzip = require('unzip');
var unzip = require('node-unzip-2');
var temp = require("temp").track();
var path = require('path');
var PostboardSheet = require('./postboard.model').PostboardSheet;

var filesDir = __dirname + '/../../../files/files/noteContents';

var readJSON = function (dirPath, filename, cb) {
  return fs.readFile(path.join(dirPath, filename), 'utf8', function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};

var contentNotesDirForBoardId = function (postboardId) {
  return path.join(filesDir, postboardId.toString());
}

exports.import = function (files, cb) {
  if (!files || !files.file) { cb("Upload failed", {}); return; }
  var file = files.file;
  if (file.extension !== '3csb') { cb("Must be a 3csb file", {}); return; }
  var postboardCreated = null;
  var dirCreated = null;
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
                var destDir = contentNotesDirForBoardId(postboard._id);
                fsExtra.ensureDir(destDir, function (err) {
                  if (err) return done(err);
                  dirCreated = destDir;
                  metadata.noteContentUUIDs.forEach(function (noteContentUUID) {
                    var filename = 'note-' + noteContentUUID + '-enhanced.jpg';
                    var source = path.join(dirPath, filename);
                    var target = path.join(destDir, filename);
                    fsExtra.move(source, target, function (err) {
                      if (err) return done(err);
                      temp.cleanupSync();
                      done();
                    });
                  });
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
        if (dirCreated) {
          fsExtra.remove(dirCreated, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('rolled back ' + dirCreated);
            }
          });
        }
      }
      cb(err, {});
      cbCalled = true;
    }
  };
}

exports.removeFiles = function (postboardId, cb) {
  fsExtra.remove(contentNotesDirForBoardId(postboardId), function (err) {
    cb(err);
  });
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
