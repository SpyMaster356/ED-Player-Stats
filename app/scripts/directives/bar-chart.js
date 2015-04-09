'use strict';

/* global d3 */

/**
 * @ngdoc directive
 * @name comp3024Assign4App.directive:barChart
 * @description
 * # barChart
 */
 angular.module('comp3024Assign4App')
 .directive('barChart', function ($http, DataFactory) {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function (scope, element) {
      var init = function () {
        DataFactory.getData()
          .success(processData)
          .error(function () {
            console.log('an error occured');
          });
      };

      var processData = function (allData) {
        var ships = countShips(allData);
        var data = convertToSeries(ships);
        render(element[0], data);
      };

      var countShips = function (allData) {
        var ships = {};

        for (var recordIndex = 0; recordIndex < allData.length; recordIndex++) {
          var record = allData[recordIndex];

          for (var index = 0; index < record.ships.length; index++) {
            var ship = record.ships[index];

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

      var render = function (element, data) {
        var width = 500,
          barHeight = 20;

        var x = d3.scale.linear()
          .range([0, width])
          .domain([0, d3.max(data, function(d) { return d.value; })]);

        var chart = d3.select(element)
          .append('svg')
          .attr('height', barHeight * data.length);

        var bar =
          chart.selectAll('g')
            .data(data)
          .enter().append('g')
            .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

        bar.append('rect')
          .attr('width', function(d) { return x(d.value); })
          .attr('height', barHeight - 1);

        bar.append('text')
          .attr('x', function(d) { return x(d.value) + 3; })
          .attr('y', barHeight / 2)
          .attr('dy', '.35em')
          .text(function(d) { return d.label + ' (' + d.value + ')'; });
      };

      init();
    }
  };
});
