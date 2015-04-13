'use strict';

/**
 * @ngdoc function
 * @name comp3024Assign4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comp3024Assign4App
 */
angular.module('comp3024Assign4App')
  .controller('RolesCtrl', function ($scope, DataFactory, dataFilter, dataCounter, seriesService) {
    var allData;
    var init = function () {
      $scope.roleFilter = 'All';
      $scope.gameModeFilter = 'All';
      $scope.ownedSinceFilter = 'All';
      $scope.factionFilter = 'All';
      $scope.genderFilter = 'All';

      $scope.$watch('roleFilter',       function () { refreshData(); });
      $scope.$watch('gameModeFilter',   function () { refreshData(); });
      $scope.$watch('ownedSinceFilter', function () { refreshData(); });
      $scope.$watch('factionFilter',    function () { refreshData(); });
      $scope.$watch('genderFilter',    function () { refreshData(); });

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
      filteredData = dataFilter.filterByGender(filteredData, $scope.genderFilter);

      var primaryRoles = dataCounter.countPrimaryRoles(filteredData);
      primaryRoles = seriesService.convertToSeries(primaryRoles);
      seriesService.sortSeriesByLabel(primaryRoles);
      $scope.primaryRoles = primaryRoles;

      var secondaryRoles = dataCounter.countAllRoles(filteredData);
      secondaryRoles = dataFilter.removeRole(secondaryRoles, $scope.roleFilter);
      secondaryRoles = seriesService.convertToSeries(secondaryRoles);
      seriesService.sortSeriesByLabel(secondaryRoles);
      $scope.secondaryRoles = secondaryRoles;

      var otherRoles = dataCounter.parseOtherRoles(filteredData);
      otherRoles = seriesService.convertToSeries(otherRoles);
      seriesService.sortSeriesByValue(otherRoles, true);
      $scope.otherRoles = otherRoles;
    };

    init();
  });
