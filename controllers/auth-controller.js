const express = require('express');
const jwt = require('jwt-simple');
const passport = require('passport');
const Bluebird = require('bluebird');
const csrf = require('csurf');
const User = require('../models/user');
const securityConfig = require('../config/security-config');

const router = express.Router();
router.use(express.static('public'));
router.use(require('connect-flash')());

const csrfProtection = csrf({ cookie: true });

router.get('/login', (req, res, next) => {
	res.render('login', { csrfToken: req.csrfToken() });
});

router.get('/register', (req, res, next) => {
	res.render('register', { csrfToken: req.csrfToken() });
});

router.get('/logout', (req, res, next) => {
	req.logout();
	req.flash('message', 'Succesfully logged out')
	res.redirect('/');
})

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	})(req, res, next);
});

router.post('/jwt/login', (req, res) => {
	const {username, password} = req.body;
	Bluebird.coroutine(function* () {
		const user = yield User.forge({username: username}).fetch();
		const isValidPassword = yield user.validPassword(password);
		if (isValidPassword) {
			const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
			res.header('Authorization', token).json({success: true, token: token});
		} else {
			res.json({success: false, msg: 'Authentication failed'});
		}
	})().catch(err => console.log(err));
});

router.post('/register', (req, res) => {
	const {username, password} = req.body;
	User.forge({username, password}).save()
			.then(user => {
				req.login(user, (err) => {
					if(err) {
						return console.log(err);
					}
				  res.redirect('/');
				})
			});
});

module.exports = router;