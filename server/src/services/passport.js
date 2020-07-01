const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;

const User  = require('../db/models/users')

passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
});

passport.use( new LocalStrategy(async (username, password, done) => {    
    let user = await User.findOne({ userName: username });    
    if (!user) {  return done(null, false);  }
    if (!bcrypt.compareSync( password, user.password )) { return done(null, false);  }
    return done(null, user);    
}) )
