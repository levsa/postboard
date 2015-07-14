'use strict';

angular.module('postboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  })


  .directive("clickToEdit", function () {
    return {
        restrict: "A",
        templateUrl: 'assets/main.editableboardname.html',
        scope: {
            value: "=clickToEdit",
            onSaved: "&onSaved",
            url: "@clickToEditUrl",
            tooltip: "@clickToEditTooltip",
            onClose: "&onClose"
        },
        link: function (scope, element, attrs) {
            scope.view = {
                editableValue: scope.value,
                editorEnabled: false
            };

            scope.enableEditor = function () {
                scope.view.editorEnabled = true;
                scope.view.editableValue = scope.value;
                setTimeout(function () {
                    element.find('input')[0].focus();
                    //element.find('input').focus().select(); // w/ jQuery
                });
            };

            scope.disableEditor = function () {
                scope.view.editorEnabled = false;
            };

            scope.closeAction = function () {
              if (scope.onClose) {
                setTimeout(scope.onClose, 1);
              }
            };

            scope.save = function () {
                scope.value = scope.view.editableValue;
                scope.disableEditor();
                if (scope.onSaved) {
                  setTimeout(scope.onSaved, 1);
                }
            };

        }
    };
});
