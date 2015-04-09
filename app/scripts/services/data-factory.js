'use strict';

/**
 * @ngdoc service
 * @name comp3024Assign4App.dataFactory
 * @description
 * # dataFactory
 * Factory in the comp3024Assign4App.
 */
angular.module('comp3024Assign4App')
  .factory('DataFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
