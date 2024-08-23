
const port = 3000
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./FirebaseDaeLink.json');


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.get('/', (req, res) => {
console.log("foi")
})

app.put('/documentos/', async (req, res) => {
   
})



app.listen(port, () => console.log(`Servidor funcionando!!! ${port}!`))