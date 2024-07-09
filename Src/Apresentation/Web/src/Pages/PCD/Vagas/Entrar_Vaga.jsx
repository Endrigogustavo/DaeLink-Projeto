import React, { useState, useEffect} from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useParams,useNavigate } from 'react-router-dom';

const AddPessoaForm = () => {
  const navigate = useNavigate();
  const { id, vagaId } = useParams();

  const [vagaUid, setVagaUid] = useState(vagaId);
  const [pessoaId, setPessoaId] = useState(id);
  const [email, setEmail] = useState("")


  useEffect(() => {
    // Configura os estados apenas uma vez quando o componente é montado
    if (id && vagaUid) {
      setPessoaId(id);
      setVagaUid(vagaUid);
    }
  }, [id, vagaUid]);


  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (!vagaUid || !pessoaId) {
      alert(id)
      alert(vagaUid)
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const vagaRef = doc(db, "Vagas", vagaUid);
      await updateDoc(vagaRef, {
        candidato: arrayUnion(pessoaId),
        emailcandidato: arrayUnion(email)
      });
      alert("Pessoa adicionada com sucesso!");
      setVagaUid("");
      setPessoaId("");
      navigate(`/homeuser/${id}`);
    } catch (e) {
      console.error("Erro ao adicionar pessoa: ", e);
      alert("Erro ao adicionar pessoa.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="hidden" 
          value={pessoaId} 
          onChange={(e) => setPessoaId(e.target.value)} 
        />
      </div>
      <div>
        <label>email de contato:</label>
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