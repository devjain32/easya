var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy({
    usernameField: "email"
  },
  function (email, password, done) {
    console.log(email);
    console.log(password);
    User.findOne(
      { email: email },
      function(err, user){
        if(err) {
          return done(err);
        }
        if(!user){
          return done(null, false, "Incorrect email");
        }
        if(!user.validPassword(password)){
          return done(null, false, "Incorrect password");
        }
        return done(null, user);
      })
  })
);

passport.serializeUser(function(user, cb){
  cb(null, user);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});
// Exporting our configured passport
module.exports = passport;