angular
  .module('game')
  .controller('gameController', gameController)


function gameController(){
  console.log('game controller init')

  var socket  = io()
  socket.on('connect', function(){
    
    console.log('connected')
  })




}