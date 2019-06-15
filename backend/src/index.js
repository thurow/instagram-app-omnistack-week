const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://semana:semana@cluster0-t4az9.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// Passing the socket as middleware for all requests
app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

// static files endpoint to load the images
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
