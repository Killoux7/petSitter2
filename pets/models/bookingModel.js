const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserOwner',
    required: true
  },
  petSitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSitter',
    required: true
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pets',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['en attente', 'disponible', 'reservé', 'annulé'],
    default: 'en attente'
  }
});

module.exports = mongoose.model('Booking', bookingSchema, 'booking');