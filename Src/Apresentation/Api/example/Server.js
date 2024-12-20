
const port = 3000
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./daelink-database.json');
const fs = require('fs');
const path = require('path');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();


const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("foi")
})

app.post('/login', async (req, res) => {
  const uid = req.body.uid;
  try {
    const result = db.collection("PCD", uid)
    .get()
    if (!result.empty) {
     
      res.status(200).json({ message: 'Login successful'});
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Login error: ", error.code, error.message);
    return false;
  }
})

app.post('/logout', (req, res) =>{
      res.clearCookie('tokenId');
      res.send("cookie deletado")
})

app.post('/cookie', (req, res) => {
  const uid = req.body.uid
  res.cookie('tokenId', uid, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 3600000, 
    path: '/' 
  });

  res.send('Cookie definido com sucesso!');
});

app.get('/getPCD', (req, res) =>{
  const tokenId = req.cookies.tokenId
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
  const Status = "Aberta"

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

app.get('/seeds', async (req, res) => {
  try {
    // Leia o arquivo JSON
    const filePath = path.join(__dirname, 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data); // Converta o JSON em um objeto
      const batch = admin.firestore().batch(); // Usamos batch para otimizar inserções múltiplas

      users.forEach((user) => {
        const docRef = admin.firestore().collection('PCD').doc(); 
        batch.set(docRef, {
          name: user.name,
          email: user.email,
          idade: user.idade,
          deficiencia: user.deficiencia,
          descrição: user.descricao,
          trabalho: user.trabalho,
          profileImage: user.profileImage,
          backgroundImage: user.backgroundImage,
          sobre: user.sobre,
          experiencias: user.experiencias,
          tipo: user.tipo,
          laudomedico: user.laudomedico,
          CPF: user.CPF
        });
      });

      // Confirma o envio em lote
      await batch.commit();

      res.status(201).send('20 usuários adicionados com sucesso!');
      console.log("Sucesso");
    
  } catch (error) {
    console.error('Erro ao adicionar usuários:', error);
    res.status(500).send('Erro ao adicionar usuários');
  }
});


app.listen(port, () => console.log(`Servidor funcionando!!! ${port}!`))