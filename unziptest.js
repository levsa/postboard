console.log('Hello World');
var fs = require('fs');
var path = require('path');
//var unzip = require('unzip');
var unzip = require('node-unzip-2');

fs.createReadStream('testdata/board.3csb')
  .pipe(unzip.Parse())
  .on('entry', function (entry) {
    var fileName = entry.path;
    var type = entry.type; // 'Directory' or 'File'
    var size = entry.size;
    console.log("FILE: " + fileName + " type = " + entry.type);
    entry.autodrain();
});

