var express = require('express');
var router = express.Router();

// ***************SHOW ALL***************
router.get('/', function(req,res){
 res.json('Hello Niall')
})




module.exports = router