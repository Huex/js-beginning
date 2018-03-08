'use strict';

var defaultData =
{
    title: "JSON Converter"
};

angular.module("jsonConverter", []).controller("pageCtrl", [
    "$scope", function($scope) {
        $scope.title = defaultData.title;
        var jsonDoc = {};

        function convert(doc) {
            for (var i = 0; i < doc.length; i++) {
                doc[i].collections = [{ id: doc[i].Type }];
                doc[i].id = doc[i].Id;
                delete doc[i].Type;
                delete doc[i].Id;
            }
            return doc;
        }
        function handleFileSelect(evt) {
            var files = evt.target.files;
            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    jsonDoc = JSON.parse(reader.result);
                    console.log(JSON.stringify(convert(jsonDoc)));
                });
                reader.readAsText(f);
            }
        }
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }
]);