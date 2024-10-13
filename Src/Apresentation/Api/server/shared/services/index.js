const { db } = require('../../database/firebase')

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

