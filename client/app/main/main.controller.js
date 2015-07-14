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

    $scope.onPostboardNameSaved = function (postboard) {
      console.log(postboard);
      var postUrl = '/api/postboards/' + postboard._id;
      console.log('posting: ', postUrl);
      $http.put(postUrl, postboard).
        success(function (data, status /*, headers, config */) {
          console.log('put success: ', data, status);
        }).
        error(function (data, status /*, headers, config */) {
          console.log('put error: ', data, status);
        });
    };

    $scope.onFileSelect = function (files) {
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

    $http.get('/api/postboards').success(function(postboards) {
      $scope.postboards = postboards;
      socket.syncUpdates('postboard', $scope.postboards);
    });

    $scope.deletePostboard = function (postboard) {
      if (confirm('Delete board ' + postboard.name + '?')) {
        console.log('delete postboard: ', postboard._id);
        $http.delete('/api/postboards/' + postboard._id).
          success(function () {
            console.log('delete success ' + postboard._id);
            $scope.popSuccess('Board ' + postboard.name + ' deleted');
          }).
          error(function (err) {
            console.log('delete error: ', err);
            $scope.popError('Board delete failed ' + err);
          });
      }
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('postboard');
    });
  }]);
