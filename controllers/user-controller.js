const express = require('express');
const jwtAuth = require('../middleware/jwt-authenticate');
const localAuth = require('../middleware/local-authenticate');
const authorizedRoles = require('../middleware/roles-authorize');

const router = express.Router();
router.use(express.static('public'));

const User = require('../models/user');

router.get('/securedArea', localAuth, (req, res) => {
    res.json({msg: "You made it to the secure area"});
});

router.get('/:id', localAuth, (req, res) => {
	User.forge({id: req.params.id})
		.fetch({withRelated: ['roles', 'posts']})
		.then(user => res.status(200).json({user}))
		.catch(e => console.error(e));
})

module.exports = router;
