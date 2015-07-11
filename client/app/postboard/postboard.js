'use strict';

angular.module('postboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('postboard', {
        url: '/postboard/:postboardId',
        templateUrl: 'app/postboard/postboard.html',
        controller: 'PostboardCtrl'
      });
  });
