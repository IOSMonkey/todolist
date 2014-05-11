'use strict';
var app = angular.module('todolist', ['ngDragDrop','ngRoute']);
app.factory('DataServices',function(){
    var task = [];
    var goal = [];
    return {
        task:task,
        goal:goal
    };
});
app.controller('MainCtrl', function ($scope,$rootScope,DataServices) {
    $scope.mon = ['No Task'];
    $scope.tue = ['No Task'];
    $scope.wen = DataServices.task;
    $scope.thu = DataServices.task;
    $scope.fri = ['No Task'];
    $scope.sat = ['No Task'];
    $scope.sun = ['No Task'];

    $scope.dropSuccessHandler = function ($event, index, array) {
        array.splice(index, 1);
    };

    $scope.onDrop = function ($event, $data, array) {
        array.push($data);
    };

});
app.controller('TaskCtrl',function($scope,DataServices){
    $scope.taskContent = "";
    $scope.taskTime = "";
    $scope.goalContent = "";
    $scope.goalDue = "";
    $scope.removeTask = function(){
        window.alert($scope.task);
    };
    $scope.addTask = function(){
        if($scope.goalContent.length == 0 || $scope.taskTime.length == 0) {
            window.alert('Error');
            return;
        }
        DataServices.task.push($scope.taskContent);
    };
    $scope.addGoal = function(){
        if($scope.goalContent.length == 0 || $scope.goalDue.length == 0) {
            window.alert('Error');
            return;
        }
        DataServices.task.push($scope.goalContent);
    };
});
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/edit', {
            templateUrl: 'views/newgoal.html',
            controller: 'TaskCtrl'})
        .when('/', {
            templateUrl: 'views/detail.html',
            controller: 'MainCtrl'})
        .otherwise({
            redirectTo: '/'
        });
}]);
