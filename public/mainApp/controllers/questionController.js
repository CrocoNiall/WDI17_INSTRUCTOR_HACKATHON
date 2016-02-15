angular.module('game').controller('questionController', QuestionController);

QuestionController.$inject = ['Question'];
function QuestionController(Question) {

	var self = this;

	self.questions = Question.query(function(){

		self.question = self.questions[0];

		console.log(self.question);

	});

	return self;

}