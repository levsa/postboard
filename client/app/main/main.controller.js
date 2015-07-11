'use strict';

angular.module('postboardApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.postboards = [];

    $http.get('/api/postboards').success(function(postboards) {
      $scope.postboards = postboards;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addPostboard = function() {
      console.log("add postboard: ");
    };

    $scope.deletePostboard = function(postboard) {
      console.log("delete postboard: ", postboard._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
