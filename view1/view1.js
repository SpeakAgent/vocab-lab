'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.chosenBlanks = ['______', '_______'];
  $scope.chosenWords = [];
  $scope.mixReady = false;
  $scope.gameIndex = 0;
  $scope.showNext = false;
  $scope.showDone = false;

  $scope.gameSets = [
    {
        subwords: ['cause', 'happen', 'find', 'see', 'something'],
        correctSubs: ['cause', 'happen'],
        resultSolution: 'consequence'},
    {
        subwords: ['find', 'new', 'cause', 'one', 'many'],
        correctSubs: ['find', 'new'],
        resultSolution: 'discover',
    },
    {
        subwords: ['believe', 'something', 'find', 'gather', 'work'],
        correctSubs: ['believe', 'something'],
        resultSolution: 'opinion',
    }
  ]

  $scope.subwords = $scope.gameSets[$scope.gameIndex].subwords.slice();
  $scope.correctSubs = $scope.gameSets[$scope.gameIndex].correctSubs;
  $scope.resultSolution = $scope.gameSets[$scope.gameIndex].resultSolution;


  $scope.clickSub = function(word) {
    if ($scope.chosenBlanks.length == 0) {
        // Error message
    } else {
        $scope.chosenBlanks.pop();
        $scope.chosenWords.push(word);
        var i = $scope.subwords.indexOf(word);
        $scope.subwords.splice(i, 1);
        if ($scope.chosenBlanks.length == 0) {
            $scope.mixReady = true;   
        }
    }
  }

  $scope.clickMix = function() {
    var c = 0;
    for (var i in $scope.chosenWords) {
        var w = $scope.chosenWords[i];
        console.log("Checking", w, $scope.correctSubs)
        if ($scope.correctSubs.indexOf(w) > -1) {
            c += 1;
            console.log(w, "Worked!")
        } else {
            console.log(w, "Failed")
        }
    }

    console.log(c)

    if (c == $scope.correctSubs.length) {
        $scope.resultWord = $scope.resultSolution;
        $scope.gameBoxText = "Awesome! That combination works!"
        console.log($scope.gameIndex, $scope.gameSets.length)
        if ($scope.gameIndex != $scope.gameSets.length-1) {
            $scope.showNext = true;
        } else {
            $scope.showDone = true;
        }
        
    } else {
        $scope.chosenBlanks = ['______', '_______'];
        $scope.chosenWords = [];
        $scope.subwords = $scope.gameSets[$scope.gameIndex].subwords.slice();
        $scope.gameBoxText = "Those don't work! Try another combination."
    }
  }

  $scope.next = function() {
    $scope.gameIndex += 1;
    $scope.subwords = $scope.gameSets[$scope.gameIndex].subwords.slice();
    $scope.correctSubs = $scope.gameSets[$scope.gameIndex].correctSubs;
    $scope.resultSolution = $scope.gameSets[$scope.gameIndex].resultSolution;
    $scope.chosenBlanks = ['______', '_______'];
    $scope.chosenWords = [];
    $scope.mixReady = false;
    $scope.showNext = false;
    $scope.resultWord = "";
    $scope.gameBoxText = "";

  }

  
}]);