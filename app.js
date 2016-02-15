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

io.on('connection', function(socket){

  console.log('**********************User Connected' + socket.id)

  socket.on('hit buzzer', function(user){
    var turnAlert = {name: user.name, no: user.playerNumber}
    io.emit('turn alert', turnAlert);

    console.log(user.name + '   buzzed!!!!!')

  })

  socket.on('answer submit', function(submittedAnswer){
    console.log(submittedAnswer);
    var emitGuess = {
      user: submittedAnswer.user,
      guessId: submittedAnswer.id
    };
    io.emit('user guess', emitGuess)
  })
  	
  socket.on('join game', function(user){
    clients[socket.id] = socket
    io.emit('newUser', {id: socket.id, playerNo: playerCount, name: "Player " + playerCount});
    var recip = clients[socket.id]
    recip.emit('setname', {name: 'Player' + playerCount, playerNo: playerCount})
    playerCount++
  })

  socket.on('resetGame', function(data){
    console.log('Game has been reset.....')
    playerCount = 1
    clients = {}
  })

  socket.on('startGame', function(){
    console.log('The master is starting the game.....')
    io.emit('masterStartGame', {})
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

