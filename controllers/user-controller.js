const express = require('express');
const jwtAuth = require('../middleware/jwt-authenticate');

const router = express.Router();

router.get('/securedArea', jwtAuth, (req, res) => {
    res.json({msg: "You made it to the secure area"});
});

module.exports = router;
