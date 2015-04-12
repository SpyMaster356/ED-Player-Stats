'use strict';

/**
 * @ngdoc function
 * @name comp3024Assign4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3024Assign4App
 */
angular.module('comp3024Assign4App')
  .controller('RolesCtrl', function ($scope, DataFactory, dataFilter) {
    var allData;

    var init = function () {
      $scope.gameModeFilter = 'All';
      $scope.ownedSinceFilter = 'All';
      $scope.factionFilter = 'All';

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
      filteredData = dataFilter.filterByGameMode(filteredData, $scope.gameModeFilter);
      filteredData = dataFilter.filterByOwnedSince(filteredData, $scope.ownedSinceFilter);
      filteredData = dataFilter.filterByFaction(filteredData, $scope.factionFilter);

      var primaryRoles = countPrimaryRoles(filteredData);
      primaryRoles = convertToSeries(primaryRoles);
      sortSeriesByLabel(primaryRoles);
      $scope.primaryRoles = primaryRoles;

      var otherRoles = countAllRoles(filteredData);
      otherRoles = convertToSeries(otherRoles);
      sortSeriesByLabel(otherRoles);

      $scope.otherRoles = otherRoles;
    };

    var countPrimaryRoles = function (data) {
      var roles = {};

      if(!data) {
        return;
      }

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = angular.copy(data[recordIndex]);

        var ship = record.roles.primary;

        if(ship === '') {
          continue;
        }

        if (!roles[ship]) {
          roles[ship] = 1;
        } else {
          roles[ship]++;
        }
      }

      return roles;
    };

    var countAllRoles = function (data) {
      var roles = {};

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = data[recordIndex];

        for (var index = 0; index < record.roles.all.length; index++) {
          var ship = record.roles.all[index];

          if(ship === '') {
            continue;
          }

          if (!roles[ship]) {
            roles[ship] = 1;
          } else {
            roles[ship]++;
          }
        }
      }

      return roles;
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
