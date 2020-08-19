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

passport.use( 'signup', new LocalStrategy(async (username, password, done) => {   
    
    if(!username){ return done(null, false) }
    if(!password){ return done(null, false) }
   
    let newUser = new User({
        userName: username,
        password : bcrypt.hashSync(password, 10) 
    })  

    newUser.save((err, user) => {
        if(err){ return done(err) }
        done(null, user)
    }) 
    
}) )
