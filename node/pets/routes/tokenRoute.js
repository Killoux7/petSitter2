
const express = require('express');
const router = express.Router();
const verifyToken = require('../auth');

router.get('/privateRoute', verifyToken, (req, res) => {
    // Only authenticated users can access this
    res.status(200).send('You accessed a private route!');
  });


  module.exports = router;