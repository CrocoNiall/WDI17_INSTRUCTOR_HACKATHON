var express = require('express');
var router = express.Router();

// ***************SHOW ALL***************
router.get('/', function(req,res){
 res.json('Hello Niall')
});

router.get('/play', function(req, res) {
  // res.json('the mobile')
  res.render('play');
})


module.exports = router