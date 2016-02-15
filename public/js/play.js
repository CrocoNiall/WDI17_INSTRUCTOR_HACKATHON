$(document).ready(function() {
  
  // Init stuff
  var selectedAnswer = {};
  // set up the socket connection
  var socket = io();
  var player = {};
  toggleButtons();
  registerAnswerListener();

  socket.on('setname', function(data){
    player.playerName = data.name
    player.playerNo = data.playerNo
    console.log('i am ' + player.playerName)
  })


  socket.on('masterStartGame', function(data){
    console.log('The master is starting the game....')
    toggleButtons()
  })

  function toggleButtons() {
    $(".answer-option").prop("disabled", function(index, currentValue) { 
      return !currentValue; 
    })
  }

  function registerAnswerListener() {
    $(".answer-select").on("click", ".answer-option", sendAnswer)  
  }

  function sendAnswer(answer) {
    // var answer;
    selectedAnswer.id = $(answer.target).data("question-id");
    selectedAnswer.player = player;
    toggleButtons();
    socket.emit('answer submit', selectedAnswer);
  }
  
  // set up the shake listener
  var myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
  });

  connectToGame();

  // start listening for shakes
  myShakeEvent.start();

  // listen on the window too (just how it works)
  window.addEventListener('shake', shakeEventDidOccur, false);

  //function to call when shake occurs
  function shakeEventDidOccur () {
  	// message to server
  	socket.emit('hit buzzer', player);  
  }

  socket.on('turn alert', function(data) {
    console.log('Someone has buzzed ' + data.name)
    if (data.no != player.playerNo){
      console.log('toggeling buttons')
      toggleButtons();
    }
  })
  
  function connectToGame(){
    console.log('joining game....')
    socket.emit('join game')
  }
})
