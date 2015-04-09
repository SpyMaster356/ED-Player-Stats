'use strict';

/**
 * @ngdoc service
 * @name comp3024Assign4App.promiseFactory
 * @description
 * # promiseFactory
 * Factory in the comp3024Assign4App.
 */
angular.module('comp3024Assign4App').factory('promiseFactory', function($q) {
    return {
        decorate: function(promise) {
            promise.success = function(callback) {
                promise.then(callback);
                return promise;
            };
            promise.error = function(callback) {
                promise.then(null, callback);
                return promise;
            };
        },
        defer: function() {
            var deferred = $q.defer();
            this.decorate(deferred.promise);
            return deferred;
        }
    };
});
