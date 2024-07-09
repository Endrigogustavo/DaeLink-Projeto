import React, { useState, useEffect } from "react";
import { doc, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../../Database/Firebase";  // Ajuste o caminho conforme necessário
import { useParams, useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const AddDocumentoForm = () => {
  const navigate = useNavigate();
  const { id, vagaId } = useParams();
  const [userId, setUserId] = useState(id);
  const [vagaUid, setVagaUid] = useState(vagaId);
  const [documento, setDocumento] = useState(null);

  useEffect(() => {
    if (id && vagaUid) {
      setUserId(id);
      setVagaUid(vagaUid);
    }
  }, [id, vagaUid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vagaUid || !userId || !documento) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {

      const storageRef = ref(storage, `documentos/${documento.name}`);
      await uploadBytes(storageRef, documento);

      const downloadURL = await getDownloadURL(storageRef);

      const candidatosRef = collection(db, "Vagas", vagaUid, "candidatos");

      const q = query(candidatosRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const candidatoDoc = querySnapshot.docs[0];
        const candidatoId = candidatoDoc.id;
 
        const candidatoDocRef = doc(db, "Vagas", vagaUid, "candidatos", candidatoId);

        const documentosRef = collection(candidatoDocRef, "documentos");

        await addDoc(documentosRef, {
          url: downloadURL,
          userId: userId  
        });

        alert("Documento adicionado com sucesso!");
        setDocumento(null);
        navigate(`/homeuser/${userId}`);
      } else {
        console.error("Candidato não encontrado.");
        alert("Erro ao adicionar documento: candidato não encontrado.");
      }
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert("Erro ao adicionar documento.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="hidden"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Documento:</label>
        <input
          type="file"
          onChange={(e) => setDocumento(e.target.files[0])}
        />
      </div>
      <button type="submit">Adicionar Documento</button>
    </form>
  );
};

export default AddDocumentoForm;
