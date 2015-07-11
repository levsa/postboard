'use strict';

angular.module('postboardApp')
.controller('PostboardCtrl', function ($scope, $window, $http, socket) {

  var fabric = $window.fabric;
  var canvas = new fabric.Canvas('canvas');
  $scope.canvas = canvas;
  canvas.selection = false;

  socket.socket.on('postboard:save', function (postboardJson) {
     //updateBoard(postboardJson);
  });

  var updateNoteGroup = function (note) {
    var noteGroup = $scope.noteGroups[note._id];
    noteGroup.set({
      left: note.centerX,
      top: note.centerY,
      angle: note.layoutRotation
    });
    return noteGroup;
  }

  socket.socket.on('note:update', function (note) {
    console.log("note:update received", note._id);
    $scope.canvas.deactivateAll();
    updateNoteGroup(note);
    $scope.canvas.renderAll();
  });

  var updateNote = function (noteGroup) {
    var note = $scope.notes[noteGroup._noteId];
    note.centerX = noteGroup.get('left');
    note.centerY = noteGroup.get('top');
    note.layoutRotation = noteGroup.get('angle');
    return note;
  };

  var saveNote = function (note) {
    var postboardId = $scope.sheetJson._id;
    var postUrl = postboards + '/' + postboardId + '/notes/' + note._id;
    console.log("posting: ", postUrl);
    $http.put(postUrl, note).
      success(function (data, status, headers, config) {
        console.log("put success: ", data, status);
      }).
      error(function (data, status, headers, config) {
        console.log("put error: ", data, status);
      });
  };

  $scope.canvas.on('object:selected', function (obj) {
    if (obj.target.type === 'notegroup') {
      console.log("notegroup selected: ", obj.target.centerX, obj.target.centerY);
      console.log("notegroup selected, left, top: ", obj.target.get('left'), obj.target.get('top'));
    } else {
      console.log(obj.target.type + " selected: ", obj.target.centerX, obj.target.centerY);
      console.log(obj.target.type + " selected, left, top: ", obj.target.get('left'), obj.target.get('top'));
    }
  });

  $scope.canvas.on('object:modified', function (obj) {
    if (obj.target.type === 'notegroup') {
      console.log("object:modified");
      console.log(obj.target.type);
      console.log(obj);
      var note = updateNote(obj.target);
      saveNote(note);
      socket.socket.emit('note:update', note);
    } else {
      console.log(obj.target.type + " modified: ", obj.target.centerX, obj.target.centerY);
      console.log(obj.target.type + " modified, left, top: ", obj.target.get('left'), obj.target.get('top'));
    }
  });

  var NoteGroup = fabric.util.createClass(fabric.Group, {
    type: 'notegroup',

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

  var updateBoard = function (postboardJson) {
    console.log(postboardJson);
    $scope.sheetJson = postboardJson;
    $scope.canvas.clear();
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
          originX: 'center',
          originY: 'center',
          width: 100,
          height: 100,
          angle: note.layoutRotation
        });
        noteGroup.on('modified', function () {
        });
        $scope.noteGroups[noteId] = noteGroup;
        $scope.canvas.add(noteGroup);
        $scope.canvas.renderAll();
      });
    });
  };

  $http.get(postboards).success(function(postboardsJson) {
    updateBoard(postboardsJson[0]);
  });
});
