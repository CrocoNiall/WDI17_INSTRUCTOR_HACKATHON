angular.module('game')
	   .factory('Question' , QuestionFactory);

function QuestionFactory($resource) {

	return $resource('/api/questions/:id'); // Note the full endpoint address

}