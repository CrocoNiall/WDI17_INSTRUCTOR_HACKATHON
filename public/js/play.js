$(document).ready(function() {
  //configure sound manager
   soundManager.setup({
    url: 'swf/',
    flashVersion: 9,
    preferFlash: false,
    onready: function() {
      console.log('sound manager ready...')
    }
  }); 

  // Init stuff
  var selectedAnswer = {};
  // set up the socket connection
  var socket = io();
  var player = {};
  var allowAnswer = true;
  var clickedAnswer;
  // toggleButtons();
  registerAnswerListener();
  $(".answer-select").hide()
  $(".playerName").hide()

  socket.on('setname', function(data){
    player.playerName = data.name
    player.playerNo = data.playerNo
    console.log('i am ' + player.playerName)
    $(".playerName").text("You are Player " + player.playerNo)
    // setTimeout(function(){ responsiveVoice.speak('You are player ' + player.playerNo, "US English Female",  {rate: 1}); }, 1000)
  })

  socket.on('masterStartGame', function(data){
    console.log('The master is starting the game....')
    $(".playerName").toggle();
    $(".answer-select").toggle();
    $(".waiting").toggle();
    $("body").toggleClass("gameMode")
    updateMessage("Game started!");
    disableButtons();
    allowShake = true;
  })

  socket.on('next question', function(data) {
    console.log(data);
  })

  function updateMessage(message) {
    $(".message").text(message);
  }

  function disableButtons() {
    console.log("Disabling buttons");
    $(".answer-option").prop("disabled", true);
  }

  function enableButtons() {
    console.log("Enabling buttons");
    $(".answer-option").prop("disabled", false); 
  }

  function registerAnswerListener() {
    $(".answer-select").on("click", ".answer-option", sendAnswer)  
  }

  function sendAnswer(answer) {
    clickedAnswer = $(answer.target);
    clickedAnswer.addClass("selected");
    selectedAnswer.id = $(answer.target).data("question-id");
    selectedAnswer.player = player;
    disableButtons();
    socket.emit('answer submit', selectedAnswer);
    updateMessage("You chose answer " + selectedAnswer.id);
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
    if (allowAnswer) {
      socket.emit('hit buzzer', player);
    }
  }


  socket.on('turn winner', function(data) {
    console.log('Someone has buzzed ' + data.name)
    
    if(!allowAnswer)
      return;

    allowAnswer = false;
    console.log(data.no , player.playerNo);
    if (data.no != player.playerNo) {
      updateMessage("Player " + data.no + " buzzed first!");
      disableButtons();
    } else {
      updateMessage("You buzzed first! Choose your answer");
      enableButtons();
      playSound('buzz.mp3');
    }
  })

  socket.on('reset turn', function(data) {
    console.log(data);
    allowAnswer = true;
    updateMessage("Next question")
    enableButtons();
    if (clickedAnswer) {
      clickedAnswer.removeClass("selected");
    }

  })
  
  function connectToGame(){
    console.log('joining game....')
    socket.emit('join game')
  }


  function playSound(filename) {
    var sound = soundManager.createSound({
      url: 'sounds/' + filename
    });
    sound.play();
  }
})
