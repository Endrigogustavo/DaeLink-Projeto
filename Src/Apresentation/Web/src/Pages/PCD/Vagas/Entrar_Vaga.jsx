import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { decrypt } from "../../../Auth/Cryptography_Rotes";

const EntrarVaga = () => {
  //Função de navegação do site
  const navigate = useNavigate();
  //Utilizado para pegar o id do usuario e da vaga na tela anterior
  const { id, vagaId } = useParams();
  const decryptedId = decrypt(decodeURIComponent(id))
  const decryptedVaga = decrypt(decodeURIComponent(vagaId))

  //Variaveis onde as informações serão setadas
  const [vagaUid, setVagaUid] = useState(decryptedVaga);
  const [pessoaId, setPessoaId] = useState(decryptedId);
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")


  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
alert(decryptedId)
console.log("Decrypted ID:", decryptedId);  // Verificar o valor descriptografado
console.log("Decrypted Vaga ID:", decryptedVaga); 
    //Inicializando os IDs
    if (decryptedId && decryptedVaga) {
      setPessoaId(decryptedId);
      setVagaUid(decryptedVaga);
    }
  }, [decryptedId, decryptedVaga]);

  //Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Tratamento de erro no form
    if (!vagaUid || !pessoaId) {
      alert(decryptedId)
      alert(decryptedVaga)
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {

      {/* 
        Exemplo de Atualizar
      await updateDoc(vagaRef, {
        candidato: arrayUnion(pessoaId),
        emailcandidato: arrayUnion(email)
      });
*/}

      //Informações do banco
      const vagaRef = doc(db, "Vagas", decryptedVaga);
      const candidatosRef = collection(vagaRef, 'candidatos');
      //Add informações no banco
      await addDoc(candidatosRef, {
        userId: pessoaId,
        nome: nome,
        email: email
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
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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

export default EntrarVaga;