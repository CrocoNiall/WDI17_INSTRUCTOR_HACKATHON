var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var router      = express.Router();

var routes     = require('./routes/routes');

var bodyParser  = require('body-parser')
var morgan      = require('morgan')

app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.use(router)
app.use('/',  routes)







app.listen(port)
console.log('Server started on port ' + port + '...')