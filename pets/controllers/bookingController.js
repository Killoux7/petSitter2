const Booking = require('../models/bookingModel');

async function createReservation(req, res){
    try {
        const { petSitterId, startDate,petId, endDate, serviceType } = req.body;
        const user  = req.user._id; // Supposons que le middleware verifyToken joint les informations de l'utilisateur à req.user

        const reservation = new Booking({
          user,
          petSitter:petSitterId,
          petId,
          startDate,
          endDate,
          serviceType,
        });
    
        await reservation.save();
        res.status(201).json({
          message: 'Réservation créée avec succès',
          reservation,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Erreur lors de la création de la réservation',
          error: err.message,
        });
      }
    };

    async function getReservationsByOwner(req, res){
      try {
          const ownerId = req.user._id; // Supposons que le middleware verifyToken joint les informations de l'utilisateur à req.user
          const reservations = await Booking.find({ user: ownerId });
      
          res.status(200).json({
            message: 'Réservations récupérées avec succès',
            reservations,
          });
        } catch (err) {
          res.status(500).json({
            message: 'Erreur lors de la récupération des réservations',
            error: err.message,
          });
        }
  };
    
  async function getReservationsBySitter(req, res){
    try {
        const petSitterid = req.user._id; // Supposons que le middleware verifyToken joint les informations de l'utilisateur à req.user
        const reservations = await Booking.find({ petSitter: petSitterid });
    
        res.status(200).json({
          message: 'Réservations récupérées avec succès',
          reservations,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Erreur lors de la récupération des réservations',
          error: err.message,
        });
      }
};

async function updateReservation(req, res){
  try {
    const updatedReservation = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) {
        return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(updatedReservation);
} catch (err) {
    res.status(500).json({ message: err.message });
}
}
    




module.exports = {
    createReservation, getReservationsByOwner, getReservationsBySitter, updateReservation
  };
  