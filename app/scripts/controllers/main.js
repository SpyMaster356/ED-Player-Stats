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
    var init = function () {
        DataFactory.getData()
          .success(processShipData)
          .error(function () {
            console.log('an error occured');
          });
      };

      var processShipData = function (allData) {
        var ships = countShips(allData);
        $scope.allShips = convertToSeries(ships);

        var bountyShips = countRoleShips(allData, 'Bounty Hunter');
        $scope.bountyShips = convertToSeries(bountyShips);
      };

      var countShips = function (allData) {
        var ships = {};

        for (var recordIndex = 0; recordIndex < allData.length; recordIndex++) {
          var record = allData[recordIndex];
          record.ships.others.push(record.ships.primary);

          for (var index = 0; index < record.ships.others.length; index++) {
            var ship = record.ships.others[index];

            if (!ships[ship]) {
              ships[ship] = 1;
            } else {
              ships[ship]++;
            }
          }
        }

        return ships;
      };

      var countRoleShips = function (allData, role) {
        var ships = {};

        for (var recordIndex = 0; recordIndex < allData.length; recordIndex++) {
          var record = allData[recordIndex];

          if(record.roles.primary !== role) {
            continue;
          }

          record.ships.others.push(record.ships.primary);

          for (var index = 0; index < record.ships.others.length; index++) {
            var ship = record.ships.others[index];

            if (!ships[ship]) {
              ships[ship] = 1;
            } else {
              ships[ship]++;
            }
          }
        }

        return ships;
      };

      var convertToSeries = function (records) {
        var data = [];

        for (var record in records) {
          data.push({
            label: record,
            value: records[record]
          });
        }

        return data;
      };
    init();
  });
