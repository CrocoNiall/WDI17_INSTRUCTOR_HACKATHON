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

	Answer.create([{title:"Mount Etna", isCorrect: False},{title:"Mount Stromboli", isCorrect: False},{title:"Mount Vesuvius", isCorrect:True},{title:"Mount Vulture", isCorrect: False}] , function(err , answers){var question = Question.create({question:"Which volcano is best known for its eruption in AD 79 that led to the destruction of the Roman cities of Pompeii and Herculaneum?", options: answers});});
	Answer.create([{title:"Apollo 7", isCorrect: False},{title:"Apollo 9", isCorrect: False},{title:"Apollo 11", isCorrect:True},{title:"Apollo 13", isCorrect: False}] , function(err , answers){var question = Question.create({question:"Which Apollo mission landed the first humans on the Moon?", options: answers});});
	Answer.create([{title:"The Panama Trench", isCorrect: False},{title:"The Paraguay Trench", isCorrect: False},{title:"The Peruvian Trench", isCorrect:False},{title:"The Puerto Rico Trench", isCorrect: True}] , function(err , answers){var question = Question.create({question:"What is the deepest part of the Atlantic Ocean called?", options: answers});});
	Answer.create([{title:"32", isCorrect: True},{title:"33", isCorrect: False},{title:"34", isCorrect:False},{title:"35", isCorrect: False}] , function(err , answers){var question = Question.create({question:"How many boroughs are there in London?", options: answers});});
	Answer.create([{title:"10 Downing Street", isCorrect: False},{title:"Buckingham Palace", isCorrect: True},{title:"HM Treasury", isCorrect:False},{title:"House of Commons", isCorrect: False}] , function(err , answers){var question = Question.create({question:"Which London address is the only one with the postcode SW1A 1AA?", options: answers});});
	Answer.create([{title:"India", isCorrect: False},{title:"Iran", isCorrect: False},{title:"Israel", isCorrect:False},{title:"Italy", isCorrect: True}] , function(err , answers){var question = Question.create({question:"The small republic of San Marino is completely surrounded by which larger country?", options: answers});});
	Answer.create([{title:"10", isCorrect: False},{title:"12", isCorrect: False},{title:"20", isCorrect:False},{title:"25", isCorrect: True}] , function(err , answers){var question = Question.create({question:"Never Gonna Give You Up' reached Number 1 in how many countries?", options: answers});});
	Answer.create([{title:"GOOOOO....!", isCorrect: True},{title:"Can't hold it back anymore.", isCorrect: False},{title:"Turn away and slam the door!", isCorrect:False},{title:"Oi Steve, the screen is frozen.", isCorrect: False}] , function(err , answers){var question = Question.create({question:"Let it...", options: answers});});
	Answer.create([{title:"Christmas card", isCorrect: True},{title:"Message in a bottle", isCorrect: False},{title:"Pigeon post", isCorrect:False},{title:"Telegram", isCorrect: False}] , function(err , answers){var question = Question.create({question:"In 1843 the English civil servant Henry Cole introduced what form of communication?", options: answers});});
	Answer.create([{title:"Parliament", isCorrect: False},{title:"Family", isCorrect: True},{title:"Rake", isCorrect:False},{title:"Rush", isCorrect: False}] , function(err , answers){var question = Question.create({question:"What is the collective noun for otters?", options: answers});});
	Answer.create([{title:"1862", isCorrect: False},{title:"1863", isCorrect: True},{title:"1864", isCorrect:False},{title:"1865", isCorrect: False}] , function(err , answers){var question = Question.create({question:"When did the London Underground begin operation?", options: answers});});
	Answer.create([{title:"Dragonfly", isCorrect: False},{title:"Monkey", isCorrect: False},{title:"Squirrel", isCorrect:True},{title:"Wolf", isCorrect: False}] , function(err , answers){var question = Question.create({question:"What type of creature is a flickertail?", options: answers});});
	Answer.create([{title:"Ear", isCorrect: True},{title:"Foot", isCorrect: False},{title:"Elbow", isCorrect:False},{title:"Nose", isCorrect: False}] , function(err , answers){var question = Question.create({question:"In what part of the body is the stirrup bone?", options: answers});});
	Answer.create([{title:"2", isCorrect: False},{title:"3", isCorrect: False},{title:"4", isCorrect:True},{title:"5", isCorrect: False}] , function(err , answers){var question = Question.create({question:"In the song The Twelve Days of Christmas, how many calling birds are there?", options: answers});});
	Answer.create([{title:"BBBBRRRRRRRRRRRRRRRRRR", isCorrect: False},{title:"BRRRRRRRRRRRRRRRRRRR", isCorrect: False},{title:"ZZZZRRRRRRRRRRRR", isCorrect:False},{title:"This is pushing the definition of '2.30pm'.", isCorrect: True}] , function(err , answers){var question = Question.create({question:"What is a BRRRRRRRBRRRRRRRRBRRRRRZZZZZZZ", options: answers});});
	Answer.create([{title:"Colombia", isCorrect: False},{title:"Mexico", isCorrect: False},{title:"Panama", isCorrect:False},{title:"Venezuela", isCorrect: True}] , function(err , answers){var question = Question.create({question:"The flavouring Angostura bitters is named after a town in which country?", options: answers});});

//Final answer has different res.send callback
Answer.create([{title:"Colombia", isCorrect: False},{title:"Mexico", isCorrect: False},{title:"Panama", isCorrect:False},{title:"Venezuela", isCorrect: True}] , function(err , answers){
	var question = Question.create(
		{
			question:"The flavouring Angostura bitters is named after a town in which country?",
			options: answers
		}, function(err, question){
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