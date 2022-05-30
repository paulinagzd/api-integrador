const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');// This will be our application entry. We'll setup our server here.
const http = require('http');
const cors = require("cors");
var mysql = require('mysql');
var session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// Set up the express app
const app = express();// Log requests to the console.

app.use(cors());
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// session stuff
var connection = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "gloria19",
  database: "db_dev"
});

var sessionStore = new MySQLStore({
  checkExpirationInterval: 900000,
  expiration: 86400000
}, connection);

console.log(sessionStore);

var expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret",
  store: sessionStore,
  cookie: { expires: expireDate }
}));

app.use(passport.initialize());
app.use(passport.session());


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

/*
const corsOptions ={
  //origin:"http://localhost:3000", 
  origin:"*", 
  credentials:true,            
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
*/
module.exports = app;
