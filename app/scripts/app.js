'use strict';

/**
 * @ngdoc overview
 * @name comp3024Assign4App
 * @description
 * # comp3024Assign4App
 *
 * Main module of the application.
 */
angular
  .module('comp3024Assign4App', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/ships.html',
        controller: 'ShipsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
