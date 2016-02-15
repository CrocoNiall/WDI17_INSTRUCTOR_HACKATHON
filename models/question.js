var mongoose = require('mongoose');
var random = require('mongoose-random');

var Schema = mongoose.Schema;
var QuestionSchema = new Schema({

	title: String,
	question: String,
	category: String,
	options: [{
	    type: Schema.Types.ObjectId,
	    ref: 'Answer'
	}]

});

QuestionSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Question', QuestionSchema);