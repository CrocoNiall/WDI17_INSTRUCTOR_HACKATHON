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

	Answer.create([{title:"Mount Etna", isCorrect: false},{title:"Mount Stromboli", isCorrect: false},{title:"Mount Vesuvius", isCorrect: true},{title:"Mount Vulture", isCorrect: false}] , function(err , answers){var question = Question.create({question:"Which volcano is best known for its eruption in AD 79 that led to the destruction of the Roman cities of Pompeii and Herculaneum?", options: answers});});
	Answer.create([{title:"Apollo 7", isCorrect: false},{title:"Apollo 9", isCorrect: false},{title:"Apollo 11", isCorrect: true},{title:"Apollo 13", isCorrect: false}] , function(err , answers){var question = Question.create({question:"Which Apollo mission landed the first humans on the Moon?", options: answers});});
	Answer.create([{title:"The Panama Trench", isCorrect: false},{title:"The Paraguay Trench", isCorrect: false},{title:"The Peruvian Trench", isCorrect: true},{title:"The Puerto Rico Trench", isCorrect: false}] , function(err , answers){var question = Question.create({question:"What is the deepest part of the Atlantic Ocean called?", options: answers});});
	Answer.create([{title:"32", isCorrect: false},{title:"33", isCorrect: false},{title:"34", isCorrect: true},{title:"35", isCorrect: false}] , function(err , answers){var question = Question.create({question:"How many boroughs are there in London?", options: answers});});
	Answer.create([{title:"10 Downing Street", isCorrect: false},{title:"Buckingham Palace", isCorrect: false},{title:"HM Treasury", isCorrect: true},{title:"House of Commons", isCorrect: false}] , function(err , answers){var question = Question.create({question:"Which London address is the only one with the postcode SW1A 1AA?", options: answers});});
	Answer.create([{title:"India", isCorrect: false},{title:"Iran", isCorrect: false},{title:"Israel", isCorrect: true},{title:"Italy", isCorrect: false}] , function(err , answers){var question = Question.create({question:"The small republic of San Marino is completely surrounded by which larger country?", options: answers});});
	Answer.create([{title:"10", isCorrect: false},{title:"12", isCorrect: false},{title:"20", isCorrect: true},{title:"25", isCorrect: false}] , function(err , answers){var question = Question.create({question:"Never Gonna Give You Up' reached Number 1 in how many countries?", options: answers});});
	Answer.create([{title:"GOOOOO....!", isCorrect: false},{title:"Can't hold it back anymore.", isCorrect: false},{title:"Turn away and slam the door!", isCorrect: true},{title:"Oi Steve, the screen is frozen.", isCorrect: false}] , function(err , answers){var question = Question.create({question:"Let it...", options: answers});});
	Answer.create([{title:"Christmas card", isCorrect: false},{title:"Message in a bottle", isCorrect: false},{title:"Pigeon post", isCorrect: true},{title:"Telegram", isCorrect: false}] , function(err , answers){var question = Question.create({question:"In 1843 the English civil servant Henry Cole introduced what form of communication?", options: answers});});
	Answer.create([{title:"Parliament", isCorrect: false},{title:"Family", isCorrect: false},{title:"Rake", isCorrect: true},{title:"Rush", isCorrect: false}] , function(err , answers){var question = Question.create({question:"What is the collective noun for otters?", options: answers});});
	Answer.create([{title:"1862", isCorrect: false},{title:"1863", isCorrect: false},{title:"1864", isCorrect: true},{title:"1865", isCorrect: false}] , function(err , answers){var question = Question.create({question:"When did the London Underground begin operation?", options: answers});});
	Answer.create([{title:"Dragonfly", isCorrect: false},{title:"Monkey", isCorrect: false},{title:"Squirrel", isCorrect: true},{title:"Wolf", isCorrect: false}] , function(err , answers){var question = Question.create({question:"What type of creature is a flickertail?", options: answers});});
	Answer.create([{title:"Ear", isCorrect: false},{title:"Foot", isCorrect: false},{title:"Elbow", isCorrect: true},{title:"Nose", isCorrect: false}] , function(err , answers){var question = Question.create({question:"In what part of the body is the stirrup bone?", options: answers});});
	Answer.create([{title:"2", isCorrect: false},{title:"3", isCorrect: false},{title:"4", isCorrect: true},{title:"5", isCorrect: false}] , function(err , answers){var question = Question.create({question:"In the song The Twelve Days of Christmas, how many calling birds are there?", options: answers});});
	Answer.create([{title:"BBBBRRRRRRRRRRRRRRRRRR", isCorrect: false},{title:"BRRRRRRRRRRRRRRRRRRR", isCorrect: false},{title:"ZZZZRRRRRRRRRRRR", isCorrect: true},{title:"This is pushing the definition of '2.30pm'.", isCorrect: false}] , function(err , answers){var question = Question.create({question:"What is a BRRRRRRRBRRRRRRRRBRRRRRZZZZZZZ", options: answers});});

//Final answer has different res.send callback
Answer.create([{title:"Colombia", isCorrect: false},{title:"Mexico", isCorrect: false},{title:"Panama", isCorrect: true},{title:"Venezuela", isCorrect: false}] , function(err , answers){
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