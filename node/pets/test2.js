require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;

mongoose.connect(process.env.DB_CONNECTION)
.then((res) => console.log('Connected to database'))
.then((res) => app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}))
.catch((err) => console.log(err));

app.use(express.json({strict : false}));
app.get('/', (req, res) => { res.send('Welcome to my web server killoux'); });


const uri = 'mongodb+srv://lala:lala@cluster0.ajchegt.mongodb.net/pets?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const chienSchema = new Schema({
  nom: String,
  maitre: String
});

const listeChien = mongoose.model('Chien', chienSchema, 'chien');

async function main() {
  try {
    const chiens = await listeChien.find({});
    console.log("coucou")

    chiens.forEach(unChien => {
      console.log(unChien);
    });

  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
  } finally {
    await mongoose.connection.close();
  }
}

main().catch(console.error);

app.get('/justy', async (req, res) => {
  console.log('Route /justy appelée');
  try {
    const listeDeChiens = await listeChien.find();
    console.log(listeDeChiens);
    
    res.json(listeDeChiens);
  } catch (err) {
    console.log('Erreur lors de la récupération des données de la collection "chien"', err);
    res.status(500).send('Erreur lors de la récupération des données de la collection "chien"');
  }
});
