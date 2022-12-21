const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const passportSetup = require('./passport');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const googleauthRoute = require('./routes/googleauth');
const kakaoauthRoute = require('./routes/kakaoauth');

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

// app.use(
//   cookieSession({ name: "session", keys: ["rlaalswns"], maxAge: 24 * 60 * 60 * 100 })
// );

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

app.get('/getuser', (req, res) => {
  res.send(req.user);
});

// Routes
// app.use('/', require('./routes/index'));
// app.use('/auth', require('./routes/auth'));
app.use('/googleauth', googleauthRoute);
app.use('/kakaoauth', kakaoauthRoute);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('welcome to homepage');
});
app.get('/users', (req, res) => {
  res.send('welcome to user page');
});

app.listen('5001', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
