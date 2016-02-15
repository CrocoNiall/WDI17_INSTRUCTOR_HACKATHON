var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');


// ***************SHOW ALL***************
router.get('/questions', function(req,res){


	Question.find({})
	.populate('options')
	.exec(function (err, data) {
  
		res.send(data);

	});

	//res.send(questions);
 
});


module.exports = router