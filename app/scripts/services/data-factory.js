'use strict';

/**
 * @ngdoc service
 * @name comp3024Assign4App.dataFactory
 * @description
 * # dataFactory
 * Factory in the comp3024Assign4App.
 */
angular.module('comp3024Assign4App')
  .factory('DataFactory', function ($http) {
    // Service logic
    // ...

    var data;

    // Public API here
    return {
      getData: function () {
        console.log('fetching data');
        if(!data) {
          console.log('data not cached');
          data = $http.get('/data.json');
        }

        return data;
      }
    };
  });
