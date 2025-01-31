'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const h = require('../helpers');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) =>{
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => console.log('Error when deserializing the  user'));
    });


    let authProcessor = (accessToken, refreshToken, profile, done) =>{
       // console.log('Natu ',profile)
        h.findOne(profile.id)
            .then(result => {
                if(result){
                    done(null, result);
                }else{
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => console.log('Error when creating new user '+error));
                }
            });
        }
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}