'use strict';

angular.module('postboardApp')
.controller('PostboardCtrl', function ($scope, $window, $http) {

  var fabric = $window.fabric;
  var canvas = new fabric.Canvas('canvas');
  $scope.canvas = canvas;

  var postboards = '/api/postboards';

  $http.get(postboards).success(function(postboardsJson) {
    console.log("json: " + postboardsJson);
    var sheetJson = postboardsJson[0];
    $scope.sheetJson = sheetJson;
    $scope.postIts = [];
    sheetJson.clusters[0].notes.forEach(function (note) {
      $scope.postIts.push({
        'imgUrl': 'files/2015-06-25/note-' + note.contentUUID + '-enhanced.jpg',
        'centerX': note.centerX,
        'centerY': note.centerY,
        'angle': note.layoutRotation
      });
    });

    $scope.postIts.forEach(function (postIt, index) {
      console.log("loading postit: " + postIt.imgUrl);
      fabric.Image.fromURL(postIt.imgUrl, function(img) {
        img.set({
          left: postIt.centerX,
          top: postIt.centerY,
          width: 100,
          height: 100,
          angle: postIt.angle
        });
        $scope.canvas.add(img);
        $scope.canvas.renderAll();
      });
    });


      //socket.syncUpdates('thing', $scope.sheetJson);
  });
});
