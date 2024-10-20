const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../database/daelink-producao-firebase-adminsdk-y99vm-e1d8c6c010.json');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const { db } = require('../database/firebase')


exports.updateProfile = (req, res) => {
    const tokenId = req.cookies.tokenId;
    const ID = tokenId
    try {
      db.collection("PCD", ID).update({
        name: req.body.name,
        email: req.body.email,
        trabalho: req.body.trabalho,
        descrição: req.body.descrição,
        sobre: req.body.sobre,
        experiencias: req.body.experiencias,
        idade: req.body.idade,
        userId: ID,
        deficiencia: req.body.deficiencia,
      })
      return res.json("Created")
    
    } catch (error) {
      console.log("Erro ao add:", error)
      if(error) return res.json(error);
    }
}
exports.criarVaga = async (req, res) => {
  const ID = req.cookies.tokenId;
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

exports.enviarDoc = (req, res) =>{

}

exports.addUserVaga = (req, res) =>{
  
}

exports.enviarDoc = (req, res) =>{
  
}

exports.enviarDoc = (req, res) =>{
  
}