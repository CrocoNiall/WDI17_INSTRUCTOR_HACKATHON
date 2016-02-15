var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var router      = express.Router();

var routes      = require('./routes/routes');
var api			= require('./routes/api');
var questionCrud= require('./routes/crud/questions');
var http        = require('http').createServer(app)
var bodyParser  = require('body-parser')
var morgan      = require('morgan')
var io = require('socket.io')(http);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/buzz');

var playerCount = 1
var clients = {}
var playerToAnswer;

io.on('connection', function(socket){

  console.log('**********************User Connected' + socket.id)

  socket.on('hit buzzer', function(player){
  	// console.log(user.name + " wants to answer");
    playerToAnswer = player;
    var turnAlert = player.playerName + " has buzzed!"
    io.emit('turn alert', turnAlert);
  })

  socket.on('answer submit', function(submittedAnswer){
    console.log(submittedAnswer)
    if (submittedAnswer.player.playerNo === playerToAnswer.playerNo) {
      var emitGuess = {
        user: submittedAnswer.player,
        guessId: submittedAnswer.id
      }
      console.log(emitGuess);
      io.emit('user guess', emitGuess)
    }
  });
  	
  socket.on('join game', function(){
    io.emit('newUser', {id: socket.id, playerNo: playerCount, name: "Player " + playerCount});
    var recip = clients[socket.id]
    socket.emit('setname', {name: 'Player' + playerCount, playerNo: playerCount})
    playerCount++
  })

  socket.on('resetGame', function(data){
    console.log('Game has been reset.....')
    playerCount = 1
    clients = {}
  })

});




// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.use(router);
app.use('/',  routes);
app.use('/api' , api);
app.use('/admin/questions' , questionCrud);

app.use(express.static(__dirname + '/public'));

http.listen(port)
console.log('Server started on port ' + port + '…')

