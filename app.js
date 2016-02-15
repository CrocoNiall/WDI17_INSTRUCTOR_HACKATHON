var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var router      = express.Router();
var http        = require('http').Server(app);

var routes     = require('./routes/routes');

var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var playerCount = 1

io.on('connection', function(socket){
  console.log('**********************User Connected' + socket.id)

  socket.on('hit buzzer' , function(user){
          console.log(user.name + " wants to answer");

  })

  socket.on('join game', function(user){
    console.log('trying to connect to the game....')

    io.emit('newUser', {id: socket.id, playerNo: playerCount, name: "Player " + playerCount});
    playerCount++
  })
  

});


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.use(router);
app.use('/',  routes);

app.use(express.static(__dirname + '/public'));

http.listen(port)
console.log('Server started on port ' + port + '…')