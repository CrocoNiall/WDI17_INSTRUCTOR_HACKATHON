angular.module('game').controller('questionController', QuestionController);

QuestionController.$inject = ['$scope', '$state' , '$timeout', 'Question'];
function QuestionController($scope, $state, $timeout, Question) {

	var self = this;
	self.current = 0;
	self.playerBuzzed = "";
	self.guess = null;
	self.correct == null;

	// load the questions
	self.questions = Question.query(function(){

		self.question = self.questions[self.current];

	});

	// listen for player turns
	var socket  = io()

	socket.on('turn alert', function(data){
	  
	  	self.playerBuzzed = data;
	  	$scope.$apply();

	});

	socket.on('user guess', function(data){
	  
	  	// set the guess index
	  	self.guess = data.guessId -1;

	  	// check for correct answer
	  	self.correct = self.question.options[self.guess].isCorrect;

	  	console.log(self.question.options[self.guess]);

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

		} else {

			socket.emit('game over');
			$state.go('leaderboard')

		}

	}

	return self;

}