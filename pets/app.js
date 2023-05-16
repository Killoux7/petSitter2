// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bookingRoute = require('./routes/bookingRoute');
const tokenRoute = require('./routes/tokenRoute');
const messageRoutes = require('./routes/messageRoute');

const port = 4000;
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const session = require('express-session');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if your using https
}));
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

app.use((req, res, next) => {
  next();
});


mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connexion réussie à la base de données MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  })
  .catch((err) => {
    console.log('Erreur de connexion à la base de données MongoDB', err);
  });
 


app.use('/', userRoutes); 
app.use('/', tokenRoute);
app.use('/', bookingRoute )
app.use(messageRoutes);
