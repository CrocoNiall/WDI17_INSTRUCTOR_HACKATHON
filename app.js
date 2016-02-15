var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var router      = express.Router();
var routes      = require('./routes/routes')
var http        = require('http').createServer(app)
var bodyParser  = require('body-parser')
var morgan      = require('morgan')

var ejs         = require('ejs')
var io          = require('socket.io')(http)


app.use(morgan('dev'))

//set out view engine
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.use(router)
app.use('/',  routes)


io.on('connection', function(socket){
  console.log('someone has connected')
  socket.on('joinGame', function(data){
    console.log(msg)
  })
})




app.listen(port)
console.log('Server started on port ' + port + '...')