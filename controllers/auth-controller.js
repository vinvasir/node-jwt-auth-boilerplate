const express = require('express');
const jwt = require('jwt-simple');
const Bluebird = require('bleubird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');

const router = express.Router();

router.post('/login', (req, res) => {
	const {username, password} = req.body;
	Bluebird.coroutine(function* () {
		const user = yield User.forge({username: username}).fetch();
		const isValidPassword = yield user.validPassword(password);
		if (isValidPassword) {
			const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
			res.json({success: true, token: `JWT ${token}`});
		} else {
			res.json({success: false, msg: 'Authentication failed'});
		}
	})().catch(err => console.log(err));
});

router.post('/register', (req, res) => {
	const {username, password} = req.body;
	User.forge({username, password}).save()
			.then(user => res.json(user.omit('password')));
})

module.exports = router;