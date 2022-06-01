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
  host: process.env.SESSIONSDB_HOST,
  port: process.env.SESSIONSDB_PORT,
  user: process.env.SESSIONSDB_USER,
  password: process.env.SESSIONSDB_PASS,
  database: process.env.SESSIONSDB_DB
});

var sessionStore = new MySQLStore({
  checkExpirationInterval: parseInt(process.env.SESSIONSDB_CHECK_EXP_INTERVAL, 10),
  expiration: parseInt(process.env.SESSIONSDB_EXPIRATION, 10)
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

passport.serializeUser(function(user, done) {
  done(null, {id: user.id, email: user.email, role: user.role});
});

passport.deserializeUser(function(user, done) {
  done(null, {id: user.id, email: user.email, role: user.role});
});


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
