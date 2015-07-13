/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var PostboardSheet = require('../api/postboard/postboard.model').PostboardSheet;
var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');

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
  var noteContentsDir = path.join(__dirname, '../../files/files/noteContents');
  fsExtra.emptyDir(noteContentsDir, function (err) {
    if (err) throw err;
  });
});
