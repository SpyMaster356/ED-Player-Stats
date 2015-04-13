'use strict';

/**
 * @ngdoc service
 * @name comp3024Assign4App.dataFilter
 * @description
 * # dataFilter
 * Service in the comp3024Assign4App.
 */
angular.module('comp3024Assign4App')
  .service('dataFilter', function () {
    return {
      filterByPrimaryRole: function (data, role) {
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
      },

      filterByGameMode: function (data, gameMode) {
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
      },

      filterByOwnedSince: function (data, ownedSince) {
        var filteredData = [];

        if(data) {
          for (var index = 0; index < data.length; index++) {
            var item = data[index];

            if(ownedSince === 'All' || item.basic.ownedSince === ownedSince) {
              filteredData.push(item);
            }
          }
        }

        return filteredData;
      },

      filterByFaction: function (data, faction) {
        var filteredData = [];

        if(data) {
          for (var index = 0; index < data.length; index++) {
            var item = data[index];

            if(faction === 'All' || item.factions.supported === faction) {
              filteredData.push(item);
            }
          }
        }

        return filteredData;
      },

      filterByGender: function (data, gender) {
        var filteredData = [];

        if(data) {
          for (var index = 0; index < data.length; index++) {
            var item = data[index];

            if(gender === 'All' || item.basic.gender === gender) {
              filteredData.push(item);
            }
          }
        }

        return filteredData;
      }
    };
  });
