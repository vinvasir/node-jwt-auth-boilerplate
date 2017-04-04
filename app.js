const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/users', userController);

app.get('/', (req, res) => {
	res.render('home', {message: 'Hello from express!'});
});

app.listen(3000);