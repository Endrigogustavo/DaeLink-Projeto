import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { doc, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../../Database/Firebase";
import { decrypt } from "../../../../Security/Cryptography_Rotes";
import { onAuthStateChanged } from 'firebase/auth';
import { FaCircleArrowLeft } from "react-icons/fa6";
import VagaForm from "./VagaForm";

const EntrarVaga = () => {
  const navigate = useNavigate();
  const { vaga } = useParams();
  const decryptedVaga = decrypt(decodeURIComponent(vaga));

  const [vagaUid, setVagaUid] = useState(decryptedVaga);
  const [pessoaId, setPessoaId] = useState(null);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  useEffect(() => {
    const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setPessoaId(currentUser.uid);
      } else {
        setPessoaId(null);
      }
    });

    return () => AuthProfile();
  }, []);

  useEffect(() => {
    if (pessoaId && decryptedVaga) {
      setPessoaId(pessoaId);
      setVagaUid(decryptedVaga);
    }
  }, [pessoaId, decryptedVaga]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vagaUid || !pessoaId) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const situação = "Pendente"
      const vagaRef = doc(db, "Vagas", decryptedVaga);
      const candidatosRef = collection(vagaRef, 'candidatos');
      await addDoc(candidatosRef, {
        userId: pessoaId,
        nome: nome,
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

  const handleButtonClickReturn = () => {
    navigate(-1); // Simplesmente volta para a página anterior
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-300">
      <div className="h-fit w-fit px-4 flex flex-col justify-center gap-2 border-2 border-gray-800 rounded-xl p-8 bg-none">
        <button onClick={handleButtonClickReturn}>
          <FaCircleArrowLeft className="text-3xl text-gray-800" />
        </button>
        <div className="w-full flex flex-col">
          <p>{vagaUid.empresa}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className="w-44" alt="Logo" />
          <h1 className="font-medium">Envio de Dados para contato</h1>
        </div>
        <VagaForm />
      </div>
    </div>
  );
};

export default EntrarVaga;
