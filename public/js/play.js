$(document).ready(function() {
  console.log("hello");
  
  // user object TBC
  var user = {
  	name:"steve"
  }
  var playerName
  var playerNo

  // set up the shake listener
  var myShakeEvent = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
  });

  // set up the socket connection
  var socket = io();

  connectToGame()

  socket.on('setname', function(data){
    playerName = data.name
    playerNo = data.playerNo
    console.log('i am ' + playerName)
  })




  // socket.emit('newUser', user)

  // start listening for shakes
  myShakeEvent.start();

  // listen on the window too (just how it works)
  window.addEventListener('shake', shakeEventDidOccur, false);

  //function to call when shake occurs
  function shakeEventDidOccur () {

  	// message to server
  	socket.emit('hit buzzer' , user);
      
  }
  


function connectToGame(){
  console.log('joining game....')
  socket.emit('join game', user)
}
})