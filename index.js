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
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const asyncHandler = require('express-async-handler');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server, {
  // pingTimeout: 20000,
  cors: {
    origin: '*',
    credentials: true,
  },
});

// const io = require('socket.io')(server, {
//   pingTimeout: 20000,
//   cors: {
//     origin: '*',
//   },
// });

var allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
  'https://www.croxple.com',
  'https://server.croxple.com',
  'https://server.croxple.com/socket.io',
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

// app.use('/images', express.static(path.join(__dirname, 'public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

process.env.NODE_ENV === 'production' && app.set('trust proxy', 1);

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie:
      process.env.NODE_ENV === 'development'
        ? null
        : {
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

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });
server.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// const io = require('socket.io')(server, {
//   pingTimeout: 20000,
//   cors: {
//     origin: '*',
//   },
// });

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users, 'users');
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when ceonnect
  console.log('a user connected.', socket.id);

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    console.log(users, 'users');
    const user = getUser(receiverId);
    io.to(user?.socketId).emit('getMessage', {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
