
const port = 3000
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./daelink-projeto-firebase-adminsdk-knxeu-2c9cee419b.json');


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

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("foi")
})

app.post('/updateprofile/:id' , (req, res) =>{
  const ID = req.params.decryptedId
try {
  db.collection("PCD", ID).update({
    name: req.body.userData.name,
    email: req.body.userData.email,
    trabalho: req.body.userData.trabalho,
    descrição: req.body.userData.descrição,
    sobre: req.body.userData.sobre,
    experiencias: req.body.userData.experiencias,
    idade: req.body.userData.idade,
    userId: ID,
    deficiencia: req.body.userData.deficiencia,
  })
  return res.json("Created")

} catch (error) {
  console.log("Erro ao add:", error)
  if(err) return res.json(err);
}
})



app.post('/criarvaga/:id', async (req, res) => {
  const ID = req.params.id
  const Status = "Aberto"

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
    status: Status

  })
  
  return res.json("Created")

} catch (error) {
  console.log("Erro ao add:", error)
  if(err) return res.json(err);
}
  

})




app.listen(port, () => console.log(`Servidor funcionando!!! ${port}!`))