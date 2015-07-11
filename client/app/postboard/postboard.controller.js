'use strict';

angular.module('postboardApp')
.controller('PostboardCtrl', function ($scope, $window, $http) {

  var fabric = $window.fabric;
  var canvas = new fabric.Canvas('canvas');
  $scope.canvas = canvas;




  var NoteGroup = fabric.util.createClass(fabric.Group, {
    type: 'NoteGroup',

    initialize: function (noteId, objects, options) {
      this.callSuper('initialize', objects, options);
      this.set('_noteId', noteId);
    },

    toObject: function () {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        _noteId: this.get('_noteId')
      });
    }

  });



  var postboards = '/api/postboards';
  var putNote = '/api/postboards/';

  $http.get(postboards).success(function(postboardsJson) {
    console.log("json: " + postboardsJson);
    var sheetJson = postboardsJson[0];
    $scope.sheetJson = sheetJson;
    $scope.notes = {};
    $scope.noteGroups = {};
    $scope.sheetJson.clusters[0].notes.forEach(function (note) {
      var id = note._id;
      $scope.notes[id] = note;
    });


    Object.keys($scope.notes).forEach(function (noteId) {
      var note = $scope.notes[noteId];
      var imgUrl = 'files/2015-06-25/note-' + note.contentUUID + '-enhanced.jpg';
      console.log("loading postit: " + imgUrl);
      fabric.Image.fromURL(imgUrl, function(img) {
        img.set({
          width: 100,
          height: 100,
          originX: 0,
          originY: 0
        });
        var noteGroup = new NoteGroup(noteId, [img]);
        noteGroup.set({
          left: note.centerX,
          top: note.centerY,
          width: 100,
          height: 100,
          angle: note.layoutRotation
        });
        noteGroup.on('modified', function () {
          var note = $scope.notes[this._noteId];
          note.centerX = this.get('left');
          note.centerY = this.get('top');
          note.layoutRotation = this.get('angle');
          console.log("MODIFIED: ", this._noteId, note.centerX, note.centerY);
          var postboardId = $scope.sheetJson._id;
          var postUrl = postboards + "/" + postboardId + "/notes/" + this._noteId;
          console.log("posting: ", postUrl);
          $http.put(postUrl, note).
            success(function (data, status, headers, config) {
              console.log("put success: ", data, status);
            }).
            error(function (data, status, headers, config) {
              console.log("put error: ", data, status);
            });
        });
        $scope.noteGroups[noteId] = noteGroup;
        $scope.canvas.add(noteGroup);
        $scope.canvas.renderAll();
      });
    });


      //socket.syncUpdates('thing', $scope.sheetJson);
  });
});
