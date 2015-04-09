'use strict';

/* global d3 */

/**
 * @ngdoc directive
 * @name comp3024Assign4App.directive:barChart
 * @description
 * # barChart
 */
 angular.module('comp3024Assign4App')
 .directive('barChart', function ($http) {
  return {
    restrict: 'E',
    link: function postLink(scope, element) {
      $http.get('/data.json')
        .success(function (response) {
          var allData = response;
          var ships = {};
          var data = [];

          for (var recordIndex = 0; recordIndex < allData.length; recordIndex++) {
            var record = allData[recordIndex];

            for (var shipNameIndex = 0; shipNameIndex < record.ships.length; shipNameIndex++) {
              var shipName = record.ships[shipNameIndex];

              if (!ships[shipName]) {
                ships[shipName] = 1;
              } else {
                ships[shipName]++;
              }
            }
          }

          console.log(ships);

          for (var ship in ships) {
            data.push({
              label: ship,
              value: ships[ship]
            });
          }

          console.log(data);

          scope.render(element[0], data);
        });

      scope.render = function (element, data) {
        console.log('drawing chart...');

        var width = 500,
          barHeight = 20;

        var x = d3.scale.linear()
          .range([0, width])
          .domain([0, d3.max(data, function(d) { return d.value; })]);

        var chart = d3.select(element)
          .append('svg')            .attr('height', barHeight * data.length);

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
    }
  };
});
