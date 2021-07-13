// Require modules
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
require('dotenv').config();

// Connect to DB
require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// Set up express app
const app = express();

// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// Mount routes with app.use()
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/', commentsRouter);

app.listen(port, function () {
  console.log(`Express is listening on port:${port}`);
});

const sayHello = (fname) => {
  console.log('hi');
};
