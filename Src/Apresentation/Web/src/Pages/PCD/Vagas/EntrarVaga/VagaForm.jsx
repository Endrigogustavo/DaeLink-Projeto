import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { decrypt } from "../../../../Security/Cryptography_Rotes";
import { onAuthStateChanged } from 'firebase/auth';

const VagaForm = () => {
  //Função de navegação do site
  const navigate = useNavigate();
  //Utilizado para pegar o id do usuario e da vaga na tela anterior
  const { vaga } = useParams();

  const decryptedVaga = decrypt(decodeURIComponent(vaga))

  //Variaveis onde as informações serão setadas
  const [vagaUid, setVagaUid] = useState(decryptedVaga);
  const [pessoaId, setPessoaId] = useState(null);
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [situação, setSituação] = useState("Pendente")


  useEffect(() => {
    //Pega os dados com base no perfil de empresa logado utilizando o auth do Firebase
    const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setPessoaId(currentUser.uid);
      } else {
        setPessoaId(null);
      }
    });

    return () => AuthProfile();
  }, []);


  //useEffect é utilizado por ser chamado toda vez que o site for renderizado (F5)
  useEffect(() => {
    alert(decryptedVaga)
    //Inicializando os IDs
    if (pessoaId && decryptedVaga) {
      setPessoaId(pessoaId);
      setVagaUid(decryptedVaga);
    }
  }, [pessoaId, decryptedVaga]);

  //Botão para guardar as informações no banco
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Tratamento de erro no form
    if (!vagaUid || !pessoaId) {
      alert(pessoaId)
      alert(decryptedVaga)
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      //Informações do banco
      const vagaRef = doc(db, "Vagas", decryptedVaga);
      const candidatosRef = collection(vagaRef, 'candidatos');
      //Add informações no banco
      await addDoc(candidatosRef, {
        userId: pessoaId,
        name: nome,
        email: email,
        situação: situação
      });
      alert("Pessoa adicionada com sucesso!");
      setVagaUid("");
      setPessoaId("");
      navigate(`/homeuser/${pessoaId}`);
    } catch (e) {
      console.error("Erro ao adicionar pessoa: ", e);
      alert("Erro ao adicionar pessoa.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <input
          type="hidden"
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
        />

        <div className="flex flex-col">
          <label className="text-lg font-medium">Nome</label>
          <input
            type="text"
            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Insira seu Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-medium">Email</label>
          <input
            type="text"
            className="w-80 border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent respon-w-input "
            placeholder="Insira seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="w-40 bg-blue-700 hover:bg-blue-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-all"
        >Candidatar-se</button>
      </form>
    </>
  )
};

export default VagaForm;