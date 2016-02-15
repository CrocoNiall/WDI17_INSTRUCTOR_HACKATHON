angular
  .module('game')
  .controller('lobbyController', lobbyController)


function lobbyController($scope , Game){

  var self = this
  self.players = Game.players; 

  var socket  = io();
  self.startGame = startGame

  socket.on('connect', function(){
    console.log('im connected');
  })

  socket.on('newUser', function(user){

    user.score = 0;
    Game.newPlayer(user);
    $scope.$apply();

  })


  function startGame(){
    socket.emit('startGame', {})
  }



}