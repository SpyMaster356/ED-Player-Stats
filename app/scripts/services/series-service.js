'use strict';

/**
 * @ngdoc service
 * @name comp3024Assign4App.seriesService
 * @description
 * # seriesService
 * Service in the comp3024Assign4App.
 */
angular.module('comp3024Assign4App')
  .service('seriesService', function () {
    return {
      convertToSeries: function (values) {
        var data = [];

        for (var key in values) {
          data.push({
            label: key,
            value: values[key]
          });
        }

        return data;
      },

      sortSeriesByLabel: function (series) {
        series.sort(function(a, b) {
          var textA = a.label.toUpperCase();
          var textB = b.label.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      },

      sortSeriesByValue: function (series) {
        series.sort(function(a, b) {
          return (a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 0;
        });
      }
    };
  });
