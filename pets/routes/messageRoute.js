const express = require('express');
const router = express.Router();
const verifyToken = require('../auth');
const { newMessage } = require('../controllers/messagesController');
const messageController = require('../controllers/messagesController');
const path = require('path');


router.post('/api/messages', verifyToken, newMessage);
router.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/messaging.html'));
  });
  router.get('/api/messages', messageController.getMessages )

module.exports = router;