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
      $scope.gameModeFilter = 'All';

      $scope.$watch('roleFilter', function () {
        refreshData();
      });

      $scope.$watch('gameModeFilter', function () {
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
      var filteredData = allData;
      filteredData = filterByPrimaryRole(filteredData, $scope.roleFilter);
      filteredData = filterByGameMode(filteredData, $scope.gameModeFilter);

      var primaryShips = countPrimaryShips(filteredData);
      primaryShips = convertToSeries(primaryShips);
      sortSeriesByLabel(primaryShips);
      $scope.primaryShips = primaryShips;

      var otherShips = countAllShips(filteredData);
      otherShips = convertToSeries(otherShips);
      sortSeriesByLabel(otherShips);

      $scope.otherShips = otherShips;
    };

    var filterByPrimaryRole = function (data, role) {
      var filteredData = [];

      if(data) {
        for (var index = 0; index < data.length; index++) {
          var item = data[index];

          if(role === 'All' || item.roles.primary === role) {
            filteredData.push(item);
          }
        }
      }

      return filteredData;
    };

    var filterByGameMode = function (data, gameMode) {
      var filteredData = [];

      if(data) {
        for (var index = 0; index < data.length; index++) {
          var item = data[index];

          if(gameMode === 'All' || item.basic.gameMode === gameMode) {
            filteredData.push(item);
          }
        }
      }

      return filteredData;
    };

    var countPrimaryShips = function (data) {
      var ships = {};

      if(!data) {
        return;
      }

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = angular.copy(data[recordIndex]);

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

    var countAllShips = function (data) {
      var ships = {};

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = data[recordIndex];

        for (var index = 0; index < record.ships.all.length; index++) {
          var ship = record.ships.all[index];

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

    var sortSeriesByLabel = function (series) {
      series.sort(function(a, b) {
        var textA = a.label.toUpperCase();
        var textB = b.label.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }

    init();
  });
