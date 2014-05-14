'use strict';
var app = angular.module('todolist', ['ngDragDrop', 'ngRoute', 'ui.bootstrap']);
app.factory('DataServices', function () {
    var task = [];
    var goal = [];
    return {
        task: task,
        goal: goal
    };
});
app.factory('dataFactory', ['$http', function ($http) {
    var apiUrlBase = 'http://todolist-api-1.herokuapp.com';
    var taskUrlBase = apiUrlBase + '/api/v1/tasks';
    var goalUrlBase = apiUrlBase + '/api/v1/goals'
    var dataFactory = {};
    //get the tasks from the server
    dataFactory.getTasks = function () {
        return $http.get(taskUrlBase);
    };
    //create a task to the server
    dataFactory.createTask = function (task) {
        return $http.post(taskUrlBase, task);
    };
    //create a goal to the server(goal info and tasks info)
    dataFactory.createGoal = function (goal) {
        return $http.post(goalUrlBase, goal);
    };
    //update the task
    dataFactory.updateTask = function (task) {
        return $http.put(taskUrlBase + '/' + task.ID, task)
    };
    //delete the task by id
    dataFactory.deleteTask = function (id) {
        return $http.delete(taskUrlBase + '/' + id);
    };
    //delete the goal by id
    dataFactory.deleteGoal = function (id) {
        return $http.delete(goalUrlBase + '/' + id);
    };
    return dataFactory;
}]);
app.controller('MainCtrl', function ($scope, $rootScope, DataServices, dataFactory) {
    $scope.mon = [];
    $scope.tue = [];
    $scope.wen = [];
    $scope.thu = [];
    $scope.fri = [];
    $scope.sat = [];
    $scope.sun = [];

    $scope.dropSuccessHandler = function ($event, index, array) {
        array.splice(index, 1);
    };

    $scope.onDrop = function ($event, $data, array) {
        array.push($data);
    };
    getTasks();
    //get task list
    function getTasks() {
        dataFactory.getTasks()
            .success(function (data, status, header, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.thu = data;
            })
            .error(function (error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                window.alert(error);
            });
    };
});
app.controller('TaskCtrl', function ($scope, DataServices, dataFactory) {
    $scope.taskContent = "";
    $scope.taskTime = "";
    $scope.goalContent = "";
    $scope.taskList = [
        {text: '', time: ''}
    ];

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
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
        if ($scope.taskList.length == 1) {
            return;
        }
        $scope.taskList.splice($index, 1);
    };
    $scope.addTask = function () {
        $scope.taskList.push({name: '', due: ''});
        //get the server api
    };
    $scope.addGoal = function () {
        window.alert('When is the due????' + $scope.dt);
        //get the server api
        var goal = {name: $scope.goalContent, due: $scope.due, tasks_attributes: $scope.taskList};
        window.alert(dataFactory);
        dataFactory.createGoal(goal)
            .success(function (data, status, header, config) {

            })
            .error(function (data, status, header, config) {

            });
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
