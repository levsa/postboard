/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var PostboardSheet = require('../api/postboard/postboard.model');
var fs = require('fs');

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
  var filename = __dirname + '/../../files/files/2015-06-25/sheet-BAE285A1-638E-4544-A4E2-06941D1B19EC.json'
  var sheetJson = JSON.parse(fs.readFileSync(filename, 'utf8'));

  PostboardSheet.create(sheetJson, function () {
      console.log('finished populating postboards');
    }
  );
});
