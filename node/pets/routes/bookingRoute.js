const express = require('express');
const router = express.Router()
const reservationController = require('../controllers/bookingController');
const verifyToken = require('../auth');
const multer = require('multer');
const path = require('path');
const upload = multer();

router.post('/api/reservations',verifyToken, reservationController.createReservation);
router.patch('/api/reservations/:id', verifyToken, reservationController.updateReservation);

router.get('/tesDemandes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/listeReservations.html'));
  });
router.get('/reservationsList', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/listeReservationsCoteSitter.html'));
  });

router.get('/api/listeReservations', verifyToken, reservationController.getReservationsByOwner);
router.get('/api/listeReservationsSitter', verifyToken, reservationController.getReservationsBySitter);

module.exports = router;