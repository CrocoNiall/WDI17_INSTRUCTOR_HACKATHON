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


io.on('connection', function(socket){
  console.log('someone has connected');

  socket.on('hit buzzer' , function(user){
  		console.log(user.name + " wants to answer");
  })

  socket.on('joinGame', function(data){
    	console.log(msg);
  });

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

http.listen(port);
console.log('Server started on port ' + port + '...');