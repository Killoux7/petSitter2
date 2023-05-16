const mongoose = require('mongoose');

const messageSchemat = new mongoose.Schema({
    reservationId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    date: Date
});
module.exports = mongoose.model('Messsages', messageSchemat, 'messages');