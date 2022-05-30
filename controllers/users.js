var crypto = require('crypto');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email, password, done) {
      console.log("here");
    var user = await User.findOne(
      { where: {
          email: email
        }
      });
       console.log("great job");
    if (user == null) {
        console.log("ja")
      return done(null, false, { message: 'Incorrect email.' });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        console.log(password);
        console.log(user.password);
        console.log(result);
        if (err) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        if(result){
            return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password.' });
    })
  }
));

function isValidPassword(password) {
    if (password.length >= 8) {
      return true;
    }
    return false;
  }
  
  //uses a regex to check if email is valid
  function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  module.exports = {
    async create(req, res, next) {
        bcrypt.hash(req.body.password, 5)
        .then(async hash => {
                console.log("hash");
                console.log(hash);
                if (!isValidPassword(req.body.password)) {
                    return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
                  }
                  if (!isValidEmail(req.body.email)) {
                    return res.json({status: 'error', message: 'Email address not formed correctly.'});
                  }
                
                  try {
                    var user = await User.create({
                      first_name: req.body.first_name,
                      last_name: req.body.last_name,
                      email: req.body.email,
                      role: "user",
                      password: hash,
                      salt: "ha",
                    });
                  } catch (err) {
                    return res.json({status: 'error', message: 'Email address already exists.'});
                  }
                  if (user) {
                    passport.authenticate('local', function(err, user, info) {
                      if (err) { return next(err); }
                      if (!user) {
                        return res.json({status: 'error', message: info.message});
                      }
                      req.logIn(user, function(err) {
                        if (err) { return next(err); }
                        return res.json({status: 'ok'});
                      });
                    })(req, res, next);
                  }
        })
        .catch(err => {
                console.log("err");
                res.statusMessage = "Something went wrong with the DB. Try again later.";
                return res.status(500).end();
        });
    },
  }  