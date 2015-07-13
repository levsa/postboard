'use strict';

var fs = require('fs');
var path = require('path');
//var unzip = require('unzip');
var unzip = require('node-unzip-2');
var temp = require("temp").track();
var path = require('path');

exports.import = function (files, cb) {
  if (!files || !files.file) { cb("Upload failed", {}); return; }
  var file = files.file;
  if (file.extension !== '3csb') { cb("Must be a 3csb file", {}); return; }

  temp.mkdir('postboard', function(err, dirPath) {
    if (err) throw err;
    console.log('unpacking to ' + dirPath);
    fs.createReadStream(file.path).
      pipe(unzip.Extract({ path: dirPath })).
      on('close', function (err) {
        console.log('Unzip finished', err);
        temp.cleanupSync();
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
  cb(null, {});
}



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
