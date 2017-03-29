const express = require('express');

const router = express.Router();

module.exports = function(passport) {
	router.get('/securedArea', passport.authenticate('jwt', { session: false }), (req, res) => {
	    res.json({msg: "You made it to the secure area"});
	});

	return router;
};