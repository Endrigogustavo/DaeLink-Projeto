import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useParams } from 'react-router-dom';

const AddPessoaForm = () => {

    const { id } = useParams();
  const [vagaId, setVagaId] = useState(id);
  const [pessoaId, setPessoaId] = useState("");
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vagaId || !pessoaId) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const vagaRef = doc(db, "Vagas", vagaId);
      await updateDoc(vagaRef, {
        candidato: arrayUnion(pessoaId),
        emailcandidato: arrayUnion(email)
      });
      alert("Pessoa adicionada com sucesso!");
      setVagaId("");
      setPessoaId("");
    } catch (e) {
      console.error("Erro ao adicionar pessoa: ", e);
      alert("Erro ao adicionar pessoa.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID da Pessoa:</label>
        <input 
          type="text" 
          value={pessoaId} 
          onChange={(e) => setPessoaId(e.target.value)} 
        />
      </div>
      <div>
        <label>ID da Pessoa:</label>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <button type="submit">Adicionar Pessoa</button>
    </form>
  );
};

export default AddPessoaForm;