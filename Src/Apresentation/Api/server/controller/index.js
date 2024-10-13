const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../database/daelink-producao-firebase-adminsdk-y99vm-e1d8c6c010.json');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.logout = (req, res) => {
    res.clearCookie('tokenId');
    res.send("cookie deletado")
}

exports.cookies = (req, res) => {
    const uid = req.body.uid
    res.cookie('tokenId', uid, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 3600000, 
      path: '/' 
    });
  
    res.send('Cookie definido com sucesso!');
}

exports.getPCD = async (req, res) => {
  const tokenId = req.cookies.tokenId;
  try {
    const docRef = await db.collection("PCD").doc(tokenId).get();
    if (!docRef.exists) {
      return res.status(404).send('PCD not found.');
    }
    return res.status(200).json(docRef.data());
  } catch (error) {
    console.error('Error fetching PCD data:', error);
    return res.status(500).send('Internal server error.');
  }
};

exports.updateProfile = (req, res) => {
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
}



exports.criarVaga = async (req, res) => {
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
}
