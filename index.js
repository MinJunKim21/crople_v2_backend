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

app.use(
  cors({
    origin: process.env.HOME_URL,
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
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

// Sessions
app.use(
  session({
    secret: 'minjuuunrighthere',
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
app.use('/naverauth', naverauthRoute);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('welcome to homepage');
});
app.get('/users', (req, res) => {
  res.send('welcome to user page');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
