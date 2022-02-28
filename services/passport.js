const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const mongoose = require('mongoose'); 
const keys = require('../config/keys');

const User = mongoose.model('users'); 

passport.serializeUser((user, done) =>{
    done(null, done.id); 
}); 

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user =>{
        done(null, user)
    })
})

const TEST = true

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId, 
        clientSecret: keys.googleClientSecret, 
        callbackURL: '/auth/google/callback', 
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) =>{
        const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser){
                done(null, existingUser); 
            } else{
                await new User({ googleId: profile.id })
                    .save() 
                    .then(user => done(null, user)); 
            }
    })
); 