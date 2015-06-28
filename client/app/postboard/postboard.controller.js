'use strict';

angular.module('postboardApp')
  .controller('PostboardCtrl', function ($scope, $http, socket) {
    var capture = "/files/2015-06-25/capture-EBC718E7-5C1D-4CC4-AD3E-3C1AF1332C51.json";
    var sheet = "/files/2015-06-25/sheet-BAE285A1-638E-4544-A4E2-06941D1B19EC.json";
    $http.get(sheet).success(function(sheetJson) {
      $scope.sheetJson = sheetJson;
      $scope.postIts = [];
      sheetJson.clusters[0].notes.forEach(function (note) {
        $scope.postIts.push({
          "imgUrl": "files/2015-06-25/note-" + note.contentUUID + "-enhanced.jpg"
        });
      });
      //socket.syncUpdates('thing', $scope.sheetJson);
    });
  });
