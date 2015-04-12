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

    var defaultRoles = [
      'Bounty Hunter',
      'Trader',
      'Miner',
      'Smuggler',
      'Pirate',
      'Explorer'
    ];

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

      var primaryRoles = countPrimaryRoles(filteredData);
      primaryRoles = convertToSeries(primaryRoles);
      sortSeriesByLabel(primaryRoles);
      $scope.primaryRoles = primaryRoles;

      var secondaryRoles = countAllRoles(filteredData);
      secondaryRoles = convertToSeries(secondaryRoles);
      sortSeriesByLabel(secondaryRoles);
      $scope.secondaryRoles = secondaryRoles;

      var otherRoles = parseOtherRoles(filteredData);
      otherRoles = convertToSeries(otherRoles);
      sortSeriesByValue(otherRoles, true);
      $scope.otherRoles = otherRoles;
    };

    var countPrimaryRoles = function (data) {
      var roles = {};

      if(!data) {
        return;
      }

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = angular.copy(data[recordIndex]);

        var role = record.roles.primary;

        if(role === '') {
          continue;
        }

        if (!roles[role]) {
          roles[role] = 1;
        } else {
          roles[role]++;
        }
      }

      return roles;
    };

    var countAllRoles = function (data) {
      var roles = {};

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = data[recordIndex];

        for (var index = 0; index < record.roles.all.length; index++) {
          var role = record.roles.all[index];

          if(role === '') {
            continue;
          }
          else if (defaultRoles.indexOf(role) === -1 ) {
            role = 'Other';
          }
          else if ($scope.roleFilter === role) {
            continue;
          }

          if (!roles[role]) {
            roles[role] = 1;
          } else {
            roles[role]++;
          }
        }
      }

      return roles;
    };

    var parseOtherRoles = function (data) {
      var roles = {};

      for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
        var record = data[recordIndex];

        for (var index = 0; index < record.roles.all.length; index++) {
          var role = record.roles.all[index];

          if(role === '') {
            continue;
          }
          else if (defaultRoles.indexOf(role) !== -1 ) {
            continue;
          }

          if (!roles[role]) {
            roles[role] = 1;
          } else {
            roles[role]++;
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

    var sortSeriesByValue = function (series, desc) {
      series.sort(function(a, b) {
        var sortValue = (a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 0;

        if (desc) {
          sortValue *= -1;
        }

        return sortValue;
      });
    };

    init();
  });
