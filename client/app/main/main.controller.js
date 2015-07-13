'use strict';

angular.module('postboardApp')
.controller('MainCtrl', ['$scope', '$http', 'socket', 'Upload', 'toaster',
  function ($scope, $http, socket, Upload, toaster) {

    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    $scope.popSuccess = function (message) {
      toaster.pop('success', 'Success', message);
    };

    $scope.popError = function (message) {
      toaster.pop('error', 'Error', message);
    };

    $scope.postboards = [];

    $scope.$watch('files', function () {
      console.log("watch files");
      $scope.onFileSelect($scope.files);
    });

    $scope.onFileSelect = function (files) {
      console.log("FILES: ", files);
      if (! files) {
        console.log("no files");
        return;
      }
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        Upload.upload({
          url: '/api/postboards',
          file: file
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
          $scope.popSuccess(config.file.name + ' uploaded');
          files = [];
        }).error(function (data, status, headers, config) {
          console.log('error status: ' + status);
          $scope.popError('Failed to upload ' + config.file.name + ': ' + status);
          files = [];
        });
      }
    };

    $scope.dropzoneConfig = {
      'options': { // passed into the Dropzone constructor
        'url': '/api/postboards'
      },
      'eventHandlers': {
        'sending': function (file, xhr, formData) {
          console.log("DROPZONE sending");
        },
        'success': function (file, response) {
          console.log("DROPZONE sending success");
        },
        'error': function (file, errorMessage, xhr) {
          console.log("DROPZONE sending error", errorMessage, xhr);
          toaster.pop('error', 'Error', errorMessage);
        }
      }
    };

    $http.get('/api/postboards').success(function(postboards) {
      $scope.postboards = postboards;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addPostboard = function() {
      if($scope.newPostboard === '') {
        return;
      }
      console.log('add postboard: ', $scope.newPostboard);
      $scope.newPostboard = '';
    };

    $scope.deletePostboard = function(postboard) {
      console.log('delete postboard: ', postboard._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  }]);
