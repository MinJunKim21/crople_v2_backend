const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passportSetup = require('./passport');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoute = require('./routes/auth');
const app = express();
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

connectDB();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.get('/getuser', (req, res) => {
  res.send(req.user);
});

// Routes
// app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5001;

app.listen('5001', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
