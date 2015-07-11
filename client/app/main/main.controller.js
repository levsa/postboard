'use strict';

angular.module('postboardApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.postboards = [];

    $scope.dropzoneConfig = {
      'options': { // passed into the Dropzone constructor
        'url': 'upload.php'
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
  });
