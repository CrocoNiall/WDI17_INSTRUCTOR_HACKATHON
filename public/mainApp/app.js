angular.module('game', ['ui.router','ngResource'])
  .config(MainRouter)


function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "/mainApp/states/home.html",
  })
  .state('lobby', {
    url: "/lobby",
    templateUrl: "/mainApp/states/lobby.html",
  })
  .state('leaderboard', {
    url: "/leaderboard",
    templateUrl: "/mainApp/states/leaderboard.html",
  })
  .state('questions', {
    url: "/questions",
    templateUrl: "/mainApp/states/questions.html",
  })


  $urlRouterProvider.otherwise('/');
}