var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');


// ***************SHOW ALL***************
router.get('/questions', function(req,res){

	// spoof data
	var questions = [
		{
			id:1,
			title: "Some question title",
			question: "What was the the thing that was A",
			category: "Sport",
			options: [
				{
					id:1,
					answer: "Answer A"
				},
				{
					id:2,
					answer: "Answer B"
				},
				{
					id:3,
					answer: "Answer C"
				},
				{
					id:4,
					answer: "Answer D"
				},
			],
			answer: 1
		},
		{
			id:1,
			title: "Some question title 2",
			question: "What was the the thing that was B",
			category: "Sport",
			options: [
				{
					id:1,
					answer: "Answer A"
				},
				{
					id:2,
					answer: "Answer B"
				},
				{
					id:3,
					answer: "Answer C"
				},
				{
					id:4,
					answer: "Answer D"
				},
			],
			answer: 2
		},
		{
			id:1,
			title: "Some question title 3",
			question: "What was the the thing that was C",
			category: "Sport",
			options: [
				{
					id:1,
					answer: "Answer A"
				},
				{
					id:2,
					answer: "Answer B"
				},
				{
					id:3,
					answer: "Answer C"
				},
				{
					id:4,
					answer: "Answer D"
				},
			],
			answer: 3
		}

	]

	Question.find({} , function(err,data){

		res.send(data);

	});

	//res.send(questions);
 
});


module.exports = router