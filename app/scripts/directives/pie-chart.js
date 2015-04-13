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
      var chart;
      var tooltip;

      var init = function () {
        chart = d3.select(element[0]);
        svg = chart.append('svg');

        tooltip = chart
          .append('div')
          .attr('class', 'chart-tooltip');

        tooltip.append('div')
          .attr('class', 'data-label');

        tooltip.append('span')
          .attr('class', 'data-percent');

        tooltip.append('span')
          .attr('class', 'data-value');

        $scope.$watch('data', function () {
          render($scope.data);
        });
      };

      var render = function (data) {
        var
          width = 800,
          radius = 100,
          color = d3.scale.category20(),
          legendRectSize = 18,
          legendSpacing = 4;

        svg.selectAll('*').remove();

        if(!data) { return; }

        var total = d3.sum(data, function (d) {return d.value;});

        var toPercent = d3.format('0.1%');

        var chart = svg
          .attr('width', width)
          .attr('height', d3.max([200, data.length * (legendRectSize + legendSpacing)]))
          .append('g')
            .attr('transform', 'translate(100,100)');

        var arc = d3.svg.arc()
          .innerRadius(radius/4 * 3)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function (d) { return d.value; })
          .sort(null);

        var path = chart.selectAll('path')
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

                  return 'translate(' + 260 + ',' + vert + ')';
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

        legend.append('text')
          .attr('x', 175)
          .attr('y', legendRectSize - legendSpacing)
          .attr('text-anchor', 'end')
          .text(function(d) { return d.value; });

        path.on('mouseover', function(d) {
          tooltip.select('.data-label').html(d.data.label);
          tooltip.select('.data-value').html(d.data.value);
          tooltip.select('.data-percent').html(toPercent(d.data.value / total));
          tooltip.style('display', 'block');
        });

        path.on('mouseout', function() {
          tooltip.style('display', 'none');
        });
      };

      init();
    }
  };
});
