'use strict';

/* global d3 */

/**
 * @ngdoc directive
 * @name comp3024Assign4App.directive:barChart
 * @description
 * # barChart
 */
 angular.module('comp3024Assign4App')
 .directive('barChart', function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function ($scope, element) {
      var chart;

      var init = function () {
        $scope.$watch('data', function () {
          render($scope.data);
        });

        chart = d3.select(element[0])
          .append('svg')
            .attr('width', 800);
      };

      var render = function (data) {
        var width = 500,
          barHeight = 20,
          barPadding = 5,
          color = d3.scale.category20();

        chart.selectAll('*').remove();

        if(!data) { return; }

        var x = d3.scale.linear()
          .range([0, width])
          .domain([0, d3.max(data, function(d) { return d.value; })]);

        chart.attr('height', (barHeight + barPadding) * data.length);

        var bar =
          chart.selectAll('g')
            .data(data)
          .enter()
            .append('g')
              .attr('fill', function(d, i) { return color(i); } )
              .attr('transform', function(d, i) { return 'translate(0,' + i * (barHeight + barPadding) + ')'; });

        bar.append('text')
          .attr('x', 95)
          .attr('y', barHeight / 2)
          .attr('dy', '.35em')
          .attr('text-anchor', 'end')
          .text(function(d) { return d.label; });

        bar.append('rect')
          .attr('x', 100)
          .attr('width', function(d) { return x(d.value); })
          .attr('height', barHeight - 1);

        bar.append('text')
          .attr('x', function(d) { return x(d.value) + 103; })
          .attr('y', barHeight / 2)
          .attr('dy', '.35em')
          .text(function(d) { return d.value; });
      };

      init();
    }
  };
});
