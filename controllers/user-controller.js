const express = require('express');
const jwtAuth = require('../middleware/jwt-authenticate');
const authorizedRoles = require('../middleware/roles-authorize');

const router = express.Router();

router.get('/securedArea', jwtAuth, authorizedRoles('ROLE_ADMIN'), (req, res) => {
    res.json({msg: "You made it to the secure area"});
});

module.exports = router;
