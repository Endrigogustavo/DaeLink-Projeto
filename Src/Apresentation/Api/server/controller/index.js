const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../database/daelink-producao-firebase-adminsdk-y99vm-e1d8c6c010.json');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');
const { db } = require('../database/firebase')


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

exports.enviarDoc = (req, res) =>{

}

exports.addUserVaga = (req, res) =>{
  
}

exports.enviarDoc = (req, res) =>{
  
}

exports.enviarDoc = (req, res) =>{
  
}