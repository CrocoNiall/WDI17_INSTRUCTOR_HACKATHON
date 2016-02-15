angular
  .module('game')
  .controller('gameController', gameController)


function gameController($scope){
  console.log('game controller init')

  var self = this
  self.users = [] 

  var socket  = io()
  self.startGame = startGame
  socket.on('connect', function(){
    console.log('im connected')
  })

  socket.on('newUser', function(data){
    console.log('..............new user..............')
    self.users.push(data).$apply
    console.log(self.users)
    $scope.$apply()
  })


  function startGame(){
    socket.emit('startGame', {})
  }



}