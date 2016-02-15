var express = require('express');
var router = express.Router();
var Question = require('../../models/question.js');

// ***************SHOW ALL***************
router.get('/', function(req,res){
 
	Question.find({} , function(err,data){

		res.send(data);

	});

});

// ***************CREATE NEW***************
router.get('/new', function(req,res){
 
	res.render('crud/questions/new');

});

// ***************CREATE***************
router.get('/create', function(req,res){
 
 	var question = new Question(
 		{
 			title:'Question 1', 
 			question:'What are we doing here',
 			category:"Sport"
 		});

 	question.save(function(){

 		res.send('Question Created');

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