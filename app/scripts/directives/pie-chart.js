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
          width = 500,
          height = 500,
          radius = 200,
          color = d3.scale.category20();

        svg.selectAll('*').remove();

        if(!data) { return; }

        var chart = svg
          .attr('width', width)
          .attr('height', height)
          .append('g')
            .attr('transform', 'translate(200,250)');

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
      };

      init();
    }
  };
});
