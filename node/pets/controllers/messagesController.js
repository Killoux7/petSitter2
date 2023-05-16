const Messages = require('../models/messagesModel');

const newMessage = async (req, res) => {

   
    const { reservationId, senderId, recipient, text } = req.body;
console.log(req.body)
    // Validation des données
    if (!reservationId || !senderId || !recipient || !text) {
        return res.status(400).json({ message: 'Toutes les informations doivent être fournies' });
    }

    try {
        // Création du nouveau message
        const newMessage = new Messages({
            reservationId,
            senderId,
            recipient,
            text,
            date: Date.now() // Enregistrement de la date et de l'heure actuelles
        });
       
        

        // Sauvegarde du nouveau message dans la base de données
        const savedMessage = await newMessage.save();

        // Envoi du message sauvegardé au client
        res.json(savedMessage);
    } catch (err) {
        // Gestion des erreurs éventuelles
        res.status(500).json({ message: err.message });
    }
};
async function getMessages(req, res) {
    // Récupérez les IDs des utilisateurs à partir des paramètres de requête
    const { user1, user2 } = req.query;

    // Récupérez tous les messages entre ces deux utilisateurs
    const messages = await Messages.find({
        $or: [
            { senderId: user1, recipient: user2 },
            { senderId: user2, recipient: user1 }
        ]
    });

    // Renvoyez les messages
    res.json(messages);
}

module.exports = { newMessage, getMessages };