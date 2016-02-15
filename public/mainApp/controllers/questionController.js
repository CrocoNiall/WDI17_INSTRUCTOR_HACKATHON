angular.module('game').controller('questionController', QuestionController);

QuestionController.$inject = ['$scope', 'Question'];
function QuestionController($scope, Question) {

	var self = this;
	self.current = 0;
	self.playerBuzzed = "";
	self.guess = null;

	// load the questions
	self.questions = Question.query(function(){

		self.question = self.questions[self.current];

		console.log(self.question);

	});

	// listen for player turns
	var socket  = io()

	socket.on('turn alert', function(data){
	  
	  	self.playerBuzzed = data;
	  	$scope.$apply();

	});

	socket.on('user guess', function(data){
	  
	  	self.guess = data.guessId -1;
	  	$scope.$apply();

	});

	return self;

}