const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
var { User } = require('../models');
var bcrypt = require('bcrypt');

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

  function omitHash(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}

  module.exports = {
    async create(req, res) {
        bcrypt.hash(req.body.password, 5)
        .then(async hash => {
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
                      last_login: Date.now(),
                    });
                  } catch (err) {
                    return res.json({status: 'error', message: 'Email address already exists.'});
                  }
                  if (user) {
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (err) {
                            return res.json({status: 'error', message: 'Could not excrypt password'});
                        }
                        if(result){
                            return res.status(200).send(user);
                        }
                        return res.json({status: 'error', message: 'Could not excrypt password'});
                    })
                  }
        })
        .catch(err => {
                res.statusMessage = "Something went wrong with the DB. Try again later.";
                return res.status(500).end();
        });
    },
    async authenticate(req, res) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user){
            res.json({status: 'error', message: 'no user found'});
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.json({status: 'error', message: 'wrong password'});
            }
            if(result){
                // authentication successful
                const token = jwt.sign({ sub: omitHash(user.get())}, "secret", { expiresIn: '5m' });
                return res.status(200).send({ ...omitHash(user.get()), token });
            }
            return res.json({status: 'error', message: 'wrong password'});
        })
    },
    async check(req, res) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user){
            res.json({status: 'error', message: 'no user found'});
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.json({status: 'error', message: 'wrong password'});
            }
            if(result){
                // authentication successful
                return res.status(200).send("success");
            }
            return res.json({status: 'error', message: 'wrong password'});
        })
    },
    async set(req, res){
        bcrypt.hash(req.body.password, 5)
        .then(async hash => {
                if (!isValidPassword(req.body.password)) {
                    return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
                  }
                  if (!isValidEmail(req.body.email)) {
                    return res.json({status: 'error', message: 'Email address not formed correctly.'});
                  }
                
                  try {
                    var user = await User.findOne({
                      where: {
                          email: req.body.email,
                        },
                    });
                  } catch (err) {
                    return res.json({status: 'error', message: 'Could not find User'});
                  }
                  if (user) {
                    user.set({password: hash});
                    return user.save()
                    .then((p) => res.status(200).send(omitHash(user.get())))
                    .catch((error) => res.status(400).send(error));
                }
        })
        .catch(err => {
                res.statusMessage = "Something went wrong with the DB. Try again later.";
                return res.status(500).end();
        });
    },
  }  