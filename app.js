const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const configurePassportJwt = require('./config/passport-jwt-config');
const configurePassportLocal = require('./config/passport-local-config');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');

const app = express();

app.use(logger('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Knex Session Store
const KnexSessionStore = require('connect-session-knex')(session);
const store = new KnexSessionStore({
    knex: require('./config/bookshelf-instance.js').knexInstance,
    tablename: 'sessions' // optional. Defaults to 'sessions'
});

// Express session
app.use(session({
  store: store,
  secret: 'fjei;awhg;hewro',
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
}));

app.use(passport.initialize());
app.use(passport.session());
configurePassportJwt();
configurePassportLocal();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/users', userController);

app.get('/', (req, res) => {
	res.render('home', {message: 'Hello from express!'});
});

app.listen(3000);