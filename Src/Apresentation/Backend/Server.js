
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
app.use(express.json());

app.get('/', (req, res) => {
  console.log("foi")
})

app.post('/criarvaga/:id', async (req, res) => {
  const ID = req.params.id
try {
  db.collection("Vagas").add({
    vaga: req.body.vaga,
    detalhes:req.body.detalhes,
    area: req.body.area,
    empresa: req.body.empresa,
    salario: req.body.salario,
    tipo: req.body.tipo,
    local: req.body.local,
    exigencias: req.body.exigencias,
    empresaId: ID,
  })
  
  return res.json("Created")

} catch (error) {
  console.log("Erro ao add:", error)
  if(err) return res.json(err);
}
  

})




app.listen(port, () => console.log(`Servidor funcionando!!! ${port}!`))