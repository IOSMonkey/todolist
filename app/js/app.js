'use strict';
var app = angular.module('todolist', ['ngDragDrop','ngRoute']);
app.controller('MainCtrl', function ($scope) {
    $scope.mon = [
        'John',
        'Jack',
        'Mark',
        'Ernie'
    ];
    $scope.tur = [
        'Jane',
        'Jill',
        'Betty',
        'Mary'
    ];
    $scope.wen = [
        'John',
        'Jack',
        'Mark',
        'Ernie'
    ];
    $scope.thu = [
        'John',
        'Jack',
        'Mark',
        'Ernie'
    ];
    $scope.fri = [
        'John',
        'Jack',
        'Mark',
        'Ernie'
    ];
    $scope.sat = [
        'John',
        'Jack',
        'Mark',
        'Ernie'
    ];
    $scope.sun = [
        'John',
        'Jack',
        'Mark',
        'Ernie'
    ];
    $scope.addText = "";

    $scope.dropSuccessHandler = function ($event, index, array) {
        array.splice(index, 1);
    };

    $scope.onDrop = function ($event, $data, array) {
        array.push($data);
    };

});
app.controller('TestCtrl',function($scope){

});
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/edit', {
            templateUrl: 'views/newgoal.html',
            controller: 'TestCtrl'})
        .when('/', {
            templateUrl: 'views/detail.html',
            controller: 'MainCtrl'})
        .otherwise({
            redirectTo: '/'
        });
}]);
