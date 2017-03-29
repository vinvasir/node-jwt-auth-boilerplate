const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');

const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/users', userController);

app.listen(3000);