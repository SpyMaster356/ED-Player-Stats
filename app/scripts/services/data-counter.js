'use strict';

/**
 * @ngdoc service
 * @name comp3024Assign4App.dataCounter
 * @description
 * # dataCounter
 * Service in the comp3024Assign4App.
 */
angular.module('comp3024Assign4App')
  .service('dataCounter', function () {
    var defaultRoles = [
      'Bounty Hunter',
      'Trader',
      'Miner',
      'Smuggler',
      'Pirate',
      'Explorer'
    ];

    return  {
      countPrimaryShips: function (data) {
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
      },

      countAllShips: function (data) {
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
      },

      countPrimaryRoles: function (data) {
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
      },

      countAllRoles: function (data) {
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

            if (!roles[role]) {
              roles[role] = 1;
            } else {
              roles[role]++;
            }
          }
        }

        return roles;
      },

      parseOtherRoles: function (data) {
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
      },

      countSupportedFactions: function (data) {
        var factions = {};

        if(!data) {
          return;
        }

        for (var recordIndex = 0; recordIndex < data.length; recordIndex++) {
          var record = angular.copy(data[recordIndex]);

          var faction = record.factions.supported;

          if(faction === '') {
            continue;
          }

          if (!factions[faction]) {
            factions[faction] = 1;
          } else {
            factions[faction]++;
          }
        }

        return factions;
      }
    };
  });
