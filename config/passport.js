const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy=require('passport-local');
const db =require('../model');


passport.serializeUser((user ,done)=>{
	done(null,user.id)
});

passport.deserializeUser((id, done) => {
	db.User.findById(id)
	.then(user => {
		done(null,user);
	});
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}, function ( email, password, done){
        // 1) Check if the email already exists
        db.User.findOne({ 'email': email }, function(err,user){
        	if (err)
                return done(err);
            if (!user)
                return done(null, false, {message: 'User does not exist'});
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if(isMatch){
					return done(null, user)
				}else{
					return done(null, false, {message: 'Password Incorrect'})
				}
			})
        });
}));