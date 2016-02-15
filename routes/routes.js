var express = require('express');
var router = express.Router();

// ***************SHOW ALL***************
router.get('/', function(req,res){
 res.json('Hello Niall')
});

router.get('/test' , function(req,res){

	// test the accelerometer
	res.render('test');

});



module.exports = router