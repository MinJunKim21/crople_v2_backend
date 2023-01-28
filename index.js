import { S3Client } from '@aws-sdk/client-s3';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const passportSetup = require('./config/passport');
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
const naverauthRoute = require('./routes/naverauth');
const multer = require('multer');
const path = require('path');

var allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
  'https://www.croxple.com',
  'https://server.croxple.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  try {
    return res.status(200).json('File uploaded successfully.');
  } catch (err) {
    console.log(err);
  }
});

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

// app.use(
//   cookieSession({ name: "session", keys: ["rlaalswns"], maxAge: 24 * 60 * 60 * 100 })
// );

app.set('trust proxy', 1);

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
      // httpOnly: true,
    },
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
app.use('/naverauth', naverauthRoute);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send(`welcome to homepage ${process.env.NODE_ENV}`);
});

app.get('/users', (req, res) => {
  res.send('welcome to user page');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

if (process.env.NODE_ENV == 'production') {
  console.log('Production Mode', 'heyhey');
} else if (process.env.NODE_ENV == 'development') {
  console.log('Development Mode', 'hi');
}
