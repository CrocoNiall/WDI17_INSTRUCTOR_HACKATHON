$(document).ready(function() {
  console.log("hello");
  
  // user object TBC
  var user = {
  	"name":"steve"
  }

  // set up the shake listener
  var myShakeEvent = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
  });

  // set up the socket connection
  var socket = io();

  // start listening for shakes
  myShakeEvent.start();

  // listen on the window too (just how it works)
  window.addEventListener('shake', shakeEventDidOccur, false);

  //function to call when shake occurs
  function shakeEventDidOccur () {

  	// message to server
  	socket.emit('hit buzzer' , user);
      
  }
  
})