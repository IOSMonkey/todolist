'use strict';
var app = angular.module('todolist', ['ngDragDrop', 'ngRoute','ui.bootstrap']);
app.factory('DataServices', function () {
    var task = [];
    var goal = [];
    return {
        task: task,
        goal: goal
    };
});
app.controller('MainCtrl', function ($scope, $rootScope, DataServices) {
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
app.controller('TaskCtrl', function ($scope, DataServices) {
    $scope.taskContent = "";
    $scope.taskTime = "";
    $scope.goalContent = "";
    $scope.taskList = [{text:'',time:''}];

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    $scope.removeTask = function ($index) {
        if($scope.taskList.length == 1){
            return;
        }
        $scope.taskList.splice($index, 1);
    };
    $scope.addTask = function () {
        $scope.taskList.push({text: '', time: ''});
        //get the server api
    };
    $scope.addGoal = function () {
        window.alert('When is the due????'+$scope.dt);
//        if ($scope.goalContent.length == 0 || $scope.dt.length == 0) {
//            window.alert('Error');
//            return;
//        }
        //get the server api
    };
});
app.config(['$routeProvider', function ($routeProvider) {
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
