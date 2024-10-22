const { db } = require('../../database/firebase');
const { cookies } = require('../middlewares');

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

exports.getPCDAll = async(req, res) => {
    try {
        const docRef = await db.collection("PCD").get();
        if (docRef.empty) {
          return res.status(404).send('PCD not found.');
        }
        const pcds = [];
        docRef.forEach(doc => {
            pcds.push({ id: doc.id, ...doc.data() });
        });
        return res.status(200).json(pcds);
      } catch (error) {
        console.error('Error fetching PCD data:', error);
        return res.status(500).send('Internal server error.');
      }
}

exports.getEmpresa = async (req, res) => {
    const tokenId = req.cookies.tokenId;
    try {
      const docRef = await db.collection("Empresa").doc(tokenId).get();
      if (!docRef.exists) {
        return res.status(404).send('company not found.');
      }
      return res.status(200).json(docRef.data());
    } catch (error) {
      console.error('Error fetching company data:', error);
      return res.status(500).send('Internal server error.');
    }
  };
  
  exports.getEmpresaAll = async (req, res) => {
      try {
          const docRef = await db.collection("Empresa").get();
          if (docRef.empty) {
            return res.status(404).send('company not found.');
          }
        const company = [];
        docRef.forEach(doc => {
            company.push({ id: doc.id, ...doc.data() });
        });
        return res.status(200).json(company);
        } catch (error) {
          console.error('Error fetching company data:', error);
          return res.status(500).send('Internal server error.');
        }
  }

  exports.getVaga = async (req, res) => {
    try {
      const vagaId = req.body.vagaId
      const GetVaga = await db.collection("Vagas")
      .doc(vagaId)
      .get();

      const vaga = []
      GetVaga.forEach(doc => {
        vaga.push({ id: doc.id, ...doc.data()})
      });
      return res.status(200).json(vaga)
    } catch (error) {
      console.log("Error: ", error)
      res.send(error)
    }
  }


  exports.getAllVagas = async (req, res) => {
    try {
      const DocVagas = await db.collection("Vagas").get();
      if(DocVagas.empty){
        return res.status(404).send('company not found.');
      }
      const vagas = [];
      DocVagas.forEach(doc => {
        vagas.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(vagas)
    } catch (error) {
      console.log(error.message, error)
      res.send("Erro: ", error)
    }
  }

  exports.getDocument = async (req, res) => {
    const vagaUid = req.body.vagaUid
    const userId = req.body.userId

  try {
    const docRef = db.collection('Vagas').doc(vagaUid).collection('candidatos');
    const queryDoc = docRef.where('userId', '==', userId);
    const resultDoc = await queryDoc.get();

    if (!resultDoc.empty) {
      // Apenas um candidato é esperado com base na consulta
      const candidatoDoc = resultDoc.docs[0];

      // Referência para a coleção de documentos do candidato
      const documentosRef = candidatoDoc.ref.collection('documentos');
      const resultDocumentos = await documentosRef.get();

      if (!resultDocumentos.empty) {
        const documentosData = resultDocumentos.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Se você quiser apenas o primeiro documento
        const PCDData = documentosData[0]; // ou ajuste conforme necessário
        return res.status(200).json(PCDData);
      } else {
        return res.status(404).json({ message: 'Nenhum documento encontrado.' });
      }
    } else {
      return res.status(404).json({ message: 'Nenhum candidato encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    return res.status(500).json({ message: 'Ocorreu um erro ao buscar documentos.' });
  }
  };