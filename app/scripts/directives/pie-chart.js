'use strict';

/* global d3 */

/**
 * @ngdoc directive
 * @name comp3024Assign4App.directive:barChart
 * @description
 * # barChart
 */
 angular.module('comp3024Assign4App')
 .directive('pieChart', function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function ($scope, element) {
      var svg;

      var init = function () {
        $scope.$watch('data', function () {
          render($scope.data);
        });

        svg = d3.select(element[0])
          .append('svg');
      };

      var render = function (data) {
        var
          width = 800,
          height = 400,
          radius = 200,
          color = d3.scale.category20(),
          legendRectSize = 18,
          legendSpacing = 4;

        svg.selectAll('*').remove();

        if(!data) { return; }

        var total = d3.sum(data, function (d) {return d.value;});

        var toPercent = d3.format('0.1%');

        var chart = svg
          .attr('width', width)
          .attr('height', height)
          .append('g')
            .attr('transform', 'translate(200,200)');

        var arc = d3.svg.arc()
          .innerRadius(radius/4 * 3)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function (d) { return d.value; })
          .sort(null);

        chart.selectAll('path')
          .data(pie(data))
          .enter()
            .append('path')
              .attr('fill', function(d, i) { return color(i); } )
              .attr('d', arc);

        var legend = svg.selectAll('.legend')
          .data(data)
            .enter()
              .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
                  var height = legendRectSize + legendSpacing;
                  var vert = i * height;

                  return 'translate(' + 450 + ',' + vert + ')';
                });

        legend.append('text')
          .attr('x', -5)
          .attr('y', legendRectSize - legendSpacing)
          .attr('text-anchor', 'end')
          .text(function(d) { return toPercent(d.value / total); });

        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .attr('fill', function(d, i) { return color(i); } )
          .style('stroke', function(d, i) { return color(i); } );

        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) { return d.label; });
      };

      init();
    }
  };
});
