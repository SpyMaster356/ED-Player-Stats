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
      .when('/ships', {
        templateUrl: 'views/ships.html',
        controller: 'ShipsCtrl'
      })
      .when('/roles', {
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl'
      })
      .when('/factions', {
        templateUrl: 'views/factions.html',
        controller: 'FactionsCtrl'
      })
      .otherwise({
        redirectTo: '/ships'
      });
  });
