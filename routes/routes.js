var express = require('express');
var candies = express.Router();

// ***************SHOW ALL***************
candies.get('/', function(req,res){
 res.json('Hello Niall')
})




module.exports = candies