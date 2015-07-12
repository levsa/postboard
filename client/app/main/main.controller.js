'use strict';

angular.module('postboardApp')
  .controller('MainCtrl', ['$scope', '$http', 'socket', 'Upload',
    function ($scope, $http, socket, Upload) {
    $scope.postboards = [];

    $scope.onFileSelect = function ($files) {
      console.log("FILES: ", $files);
      if (! $files) {
        console.log("no files");
        return;
      }
      for (var i = 0; i < $files.length; i++) {
        var $file = $files[i];
        Upload.upload({
          url: '/api/postboards',
          file: $file,
          progress: function(e) {
            console.log("progress", e);
          }
        }).then(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
            $files = [];
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
