angular.module('game').controller('questionController', QuestionController);

QuestionController.$inject = ['$scope', '$state' , '$timeout', 'Question'];
function QuestionController($scope, $state, $timeout, Question) {
	 soundManager.setup({
    url: 'swf/',
    flashVersion: 9,
    preferFlash: false,
    onready: function() {
      console.log('sound manager ready...')
    }
  }); 


	var self = this;
	self.current = 0;
	self.playerBuzzed = "";
	self.guess = null;
	self.correct == null;

	// load the questions
	self.questions = Question.query(function(){

		self.question = self.questions[self.current];
		speak()  	
	});

	// listen for player turns
	var socket  = io()

	socket.on('turn alert', function(data){
	  	console.log(data.no)
	  	responsiveVoice.speak('Player ' + data.no, "US English Female",  {rate: 1})
	  	self.playerBuzzed = data;
	  	$scope.$apply();

	});

	socket.on('user guess', function(data){
	  
	  	// set the guess index
	  	self.guess = data.guessId -1;

	  	// check for correct answer
	  	self.correct = self.question.options[self.guess].isCorrect;
	  	if (self.correct){
	  		  playSound('correct.mp3')
	  		  $timeout(responsiveVoice.speak('That is correct.', "US English Female",  {rate: 1}) , 500)
	  	} else {
	  		  playSound('wrong.mp3')
	  		  $timeout(responsiveVoice.speak('Im sorry, that was the wrong answer.', "US English Female",  {rate: 1}), 500)

	  	}

	  	// console.log(self.question.options[self.guess]);

	  	// update the angular watcher
	  	$scope.$apply();

	  	// wait a few second then continue
	  	$timeout(self.nextQuestion, 3000);
	 

	});

	self.nextQuestion = function(){
		self.correct = null;
		self.guess = null;
		self.playerBuzzed = null;

		if(self.current < self.questions.length) {

			self.current++;
			self.question = self.questions[self.current];
			socket.emit('next question');
			speak()  	

		} else {

			socket.emit('game over');
			$state.go('leaderboard');

		}

	}




  
  function speak(){

  	//convert question to readable string. 
  	var speechString = self.question.question 
  	speechString += '. was it,'
    speechString += self.question.options[0].title 
    speechString += ','
    speechString += self.question.options[1].title 
    speechString += ','
    speechString += self.question.options[3].title 
    speechString += ', or was it '
    speechString += self.question.options[3].title

  	setTimeout(function(){ responsiveVoice.speak(speechString, "US English Female",  {rate: 1}); }, 1000)
  }

  function playSound(filename) {
    var sound = soundManager.createSound({
      url: 'sounds/' + filename
    });
    sound.play();
  }

	return self;

}