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

  function shuffle (array) {
      var i = 0
        , j = 0
        , temp = null

      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
  }

  $scope.gameSets = [
    {
        subwords: ['cross', 'walk', 'run', 'face', 'turn'],
        correctSubs: ['cross', 'walk'],
        resultSolution: 'crosswalk'
    },
    {
        subwords: ['high', 'way', 'car', 'low', 'cross'],
        correctSubs: ['high', 'way'],
        resultSolution: 'highway'
    },
    {
        subwords: ['book', 'shelf', 'page', 'wall', 'read'],
        correctSubs: ['book', 'shelf'],
        resultSolution: 'bookshelf'
    },
    {
        subwords: ['hand', 'shake', 'stir', 'foot', 'nose'],
        correctSubs: ['hand', 'shake'],
        resultSolution: 'handshake'
    },
    {
        subwords: ['land', 'slide', 'slip', 'dirt', 'air'],
        correctSubs: ['land', 'slide'],
        resultSolution: 'landslide'
    },
    {
        subwords: ['find', 'new', 'old', 'look', 'same'],
        correctSubs: ['find', 'new'],
        resultSolution: 'discover'
    },
    {
        subwords: ['watch', 'carefully', 'speak', 'time', 'see'],
        correctSubs: ['watch', 'carefully'],
        resultSolution: 'observe'
    },
    {
        subwords: ['do', 'together', 'alone', 'fix', 'go'],
        correctSubs: ['do', 'together'],
        resultSolution: 'participate'
    },
    {
        subwords: ['arrange', 'order', 'random', 'quickly', 'stop'],
        correctSubs: ['arrange', 'order'],
        resultSolution: 'organize'
    },
    {
        subwords: ['action', 'result', 'watch', 'cause', 'final'],
        correctSubs: ['action', 'result'],
        resultSolution: 'consequence'
    },
  ]

  // We don't want to reshuffle every time. Madness!
  $scope.subwordsSaved = $scope.gameSets[$scope.gameIndex].subwords.slice();
  shuffle($scope.subwordsSaved);
  $scope.subwords = $scope.subwordsSaved.slice();

  $scope.correctSubs = $scope.gameSets[$scope.gameIndex].correctSubs;
  $scope.resultSolution = $scope.gameSets[$scope.gameIndex].resultSolution;

  $scope.isSelected = function (word) {
    console.log("Checking word", word, $scope.chosenWords.indexOf(word))
    if ($scope.chosenWords.indexOf(word) > -1) {
        console.log("returning false")
        return false
    } else {
        console.log("returning true")
        return true
    }
  }

  $scope.clickSub = function(word) {
    if ($scope.chosenWords.indexOf(word) > -1) {
        console.log(word, $scope.chosenWords);
        return
    }
    if ($scope.chosenBlanks.length == 0) {
        // Error message
    } else {
        $scope.chosenBlanks.pop();
        $scope.chosenWords.push(word);
        // var i = $scope.subwords.indexOf(word);
        // $scope.subwords.splice(i, 1);
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
        $scope.subwords = $scope.subwordsSaved.slice();
        $scope.gameBoxText = "Those don't work! Try another combination."
    }
  }

  $scope.next = function() {
    $scope.gameIndex += 1;
    $scope.subwordsSaved = $scope.gameSets[$scope.gameIndex].subwords.slice();
    shuffle($scope.subwordsSaved);
    $scope.subwords = $scope.subwordsSaved.slice();
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