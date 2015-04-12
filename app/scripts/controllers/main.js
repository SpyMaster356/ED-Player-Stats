'use strict';

/**
 * @ngdoc function
 * @name comp3024Assign4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3024Assign4App
 */
angular.module('comp3024Assign4App')
  .controller('MainCtrl', function ($scope, DataFactory) {
    var allData;

    var init = function () {
      $scope.roleFilter = 'All';

      $scope.$watch('roleFilter', function () {
        refreshData();
      });

      DataFactory.getData()
        .success(function (response) {
          allData = response;
          refreshData();
        })
        .error(function () {
          console.log('an error occured');
        });
    };

    var refreshData = function () {
      var allShips = countShips($scope.roleFilter);
      allShips = convertToSeries(allShips);
      allShips.sort(function(a, b) {
        var textA = a.label.toUpperCase();
        var textB = b.label.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      $scope.allShips = allShips;

      var primaryShips = countPrimaryShips($scope.roleFilter);
      primaryShips = convertToSeries(primaryShips);
      primaryShips.sort(function(a, b) {
        var textA = a.label.toUpperCase();
        var textB = b.label.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      $scope.primaryShips = primaryShips;
    };

    var countShips = function (role) {
      var ships = {};

      if(!allData) {
        return;
      }

      for (var recordIndex = 0; recordIndex < allData.length; recordIndex++) {
        var record = angular.copy(allData[recordIndex]);

        if(role !== 'All' && record.roles.primary !== role) {
          continue;
        }

        record.ships.others.push(record.ships.primary);

        for (var index = 0; index < record.ships.others.length; index++) {
          var ship = record.ships.others[index];

          if(ship === '') {
            continue;
          }

          if (!ships[ship]) {
            ships[ship] = 1;
          } else {
            ships[ship]++;
          }
        }
      }

      return ships;
    };

    var countPrimaryShips = function (role) {
      var ships = {};

      if(!allData) {
        return;
      }

      for (var recordIndex = 0; recordIndex < allData.length; recordIndex++) {
        var record = angular.copy(allData[recordIndex]);

        if(role !== 'All' && record.roles.primary !== role) {
          continue;
        }

        var ship = record.ships.primary;

        if(ship === '') {
          continue;
        }

        if (!ships[ship]) {
          ships[ship] = 1;
        } else {
          ships[ship]++;
        }
      }

      return ships;
    };

    var convertToSeries = function (values) {
      var data = [];

      for (var key in values) {
        data.push({
          label: key,
          value: values[key]
        });
      }

      return data;
    };

    init();
  });
