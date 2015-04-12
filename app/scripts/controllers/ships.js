'use strict';

/**
 * @ngdoc function
 * @name comp3024Assign4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3024Assign4App
 */
angular.module('comp3024Assign4App')
  .controller('ShipsCtrl', function ($scope, DataFactory, dataFilter) {
    var allData;

    var init = function () {
      $scope.roleFilter = 'All';
      $scope.gameModeFilter = 'All';
      $scope.ownedSinceFilter = 'All';
      $scope.factionFilter = 'All';

      $scope.$watch('roleFilter',       function () { refreshData(); });
      $scope.$watch('gameModeFilter',   function () { refreshData(); });
      $scope.$watch('ownedSinceFilter', function () { refreshData(); });
      $scope.$watch('factionFilter',    function () { refreshData(); });

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
      filteredData = dataFilter.filterByPrimaryRole(filteredData, $scope.roleFilter);
      filteredData = dataFilter.filterByGameMode(filteredData, $scope.gameModeFilter);
      filteredData = dataFilter.filterByOwnedSince(filteredData, $scope.ownedSinceFilter);
      filteredData = dataFilter.filterByFaction(filteredData, $scope.factionFilter);

      var primaryShips = countPrimaryShips(filteredData);
      primaryShips = convertToSeries(primaryShips);
      sortSeriesByLabel(primaryShips);
      $scope.primaryShips = primaryShips;

      var otherShips = countAllShips(filteredData);
      otherShips = convertToSeries(otherShips);
      sortSeriesByLabel(otherShips);

      $scope.otherShips = otherShips;
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
    };

    var sortSeriesByValue = function (series) {
      series.sort(function(a, b) {
        return (a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 0;
      });
    };

    init();
  });