(function () {
    var passwordDb = "SyncMaster";
    var loginDb = "hu3x";
    var wepAplicationApp = angular.module("taskManagerApp", []);
    wepAplicationApp.controller("taskManagerCtrl", ["$scope", function ($scope) {
        var taskManager = $scope;
        var db = databoom("https://t398.databoom.space", "b398");

        taskManager.upDate = function() {
            db.login(loginDb,passwordDb).then(function() {
                    db.load("tasks").then(function(data) {
                        taskManager.tasks = data;
                        $scope.$apply();
                    });
                }
            );
        }

        taskManager.title = "Task Manager";
        taskManager.user = "Stas";
        taskManager.upDate();
        taskManager.addNewTask = function (taskName) {
            if (taskName !== undefined) {
                var task = {
                    name: taskName,
                    status: false
                };
                taskManager.tasks.push(task);
                db.login(loginDb, passwordDb).then(function() {
                    db.save("tasks", task);
                });
                taskManager.taskName = undefined;
            }
        }
        taskManager.setStyle = function (status) {
            return status ? "color : green" : "color : red; font-weight : bold";
        }
        taskManager.showText = function (status) {
            return status ? "Выполнено" : "В процессе";
        } 
    }]);
})();