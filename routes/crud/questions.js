var express = require('express');
var router = express.Router();
var Question = require('../../models/question.js');
var Answer = require('../../models/answer.js');

// ***************SHOW ALL***************
router.get('/', function(req,res){
 
	Question.find({})
	.populate('options')
	.exec(function (err, data) {
	 
		res.send(data);

	});

});

// ***************CREATE NEW***************
router.get('/new', function(req,res){
 
	res.render('crud/questions/new');

});

// ***************CREATE***************
router.get('/create', function(req,res){
 
 	Answer.create([{
 					title:"Answer 1",
 					isCorrect: false
 				},{
 					title:"Answer 2",
 					isCorrect: false
 				},{
 					title:"Answer 3",
 					isCorrect: true
 				},{
 					title:"Answer 1",
 					isCorrect: false
 				}] , function(err , answers){
 					
 					var question = Question.create(
 						{
 							title:'Question 1', 
 							question:'What are we doing here',
 							category:"Sport",
 							options: answers
 						} , function(err, question){
 							res.send(question);
 						});


 						

 				});
});

// ***************EDIT***************
router.get('/edit/:id', function(req,res){
 
	res.render('crud/questions/edit');

});

// ***************UPDATE QUESTION***************
router.put('/:id', function(req,res){
 
	res.send('Update Question');

});

// ***************DELETE***************
router.delete('/:id', function(req,res){
 
	res.send('New Question');

});

// ***************GET***************
router.get('/:id', function(req,res){
 
	res.render('crud/questions/show');

});

module.exports = router