const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const securityConfig = require('./security-config');
const User = require('../models/user');

module.exports = function() {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = securityConfig.jwtSecret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		User.forge({id: jwt_payload.id}).fetch({withRelated: 'roles'})
				.then(user => user ? done(null, user) : done(null, false))
				.catch(err => done(err, false));
	}));
};