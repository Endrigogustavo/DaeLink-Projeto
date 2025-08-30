const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../daelink-database.json');
const fs = require('fs');
const path = require('path');



exports.seed = async (req, res) => {
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
              imageUrl: user.imageUrl,
              imageProfile: user.imageProfile,
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
}