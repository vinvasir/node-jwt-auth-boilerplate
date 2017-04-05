const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

module.exports = function() {
	// Local Strategy

	passport.use(new LocalStrategy((username, password, done) => {
		User
	  .forge({username: username})
	  .fetch()
	  .then(usr => {
	    if (!usr) {
	      return done(null, false, {message: 'No user found'});
	    }
	    usr.validPassword(password)
	    .then(valid => {
	      if (!valid) {
	        return done(null, false, {message: 'Wrong Password'});
	      }
	      return done(null, usr);
	    });
	  })
	  .catch(err => {
	    return done(err)
	  });
	}));

	// Serialize and deserialize users

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});
	 
	passport.deserializeUser(function(user, done) {
	  User
	  .forge({id: user})
	  .fetch()
	  .then((usr) => {
	    done(null, usr);
	  })
	  .catch((err) => {
	    done(err);
	  });
	});	
};