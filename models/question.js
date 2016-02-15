var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = new Schema({

	title: String,
	question: String,
	category: String,
	options: [{
	    type: Schema.Types.ObjectId,
	    ref: 'Answer'
	  }],
 	answer: Schema.Types.ObjectId

});

module.exports = mongoose.model('Question', QuestionSchema);