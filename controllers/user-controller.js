const express = require('express');
const jwtAuth = require('../middleware/jwt-authenticate');
const localAuth = require('../middleware/local-authenticate');
const authorizedRoles = require('../middleware/roles-authorize');

const router = express.Router();
router.use(express.static('public'));

router.get('/securedArea', localAuth, authorizedRoles('ROLE_ADMIN', 'ROLE_USER'), (req, res) => {
    res.json({msg: "You made it to the secure area"});
});

module.exports = router;
