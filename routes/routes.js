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


router.get('/startgame', function(req,res){
 res.render('mainApp/index.ejs')
})




module.exports = router