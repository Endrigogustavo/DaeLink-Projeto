import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../Database/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { registerVaga } from '../../../Auth/Auth';

const Register = () => {
  const { id } = useParams();

  const [vaga, setVaga] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [salario, setSalario] = useState("");
  const [exigencias, setExigencias] = useState("");
  const [area, setArea] = useState("");
  const [local, setLocal] = useState("");
  const [tipo, setTipo] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState("");
  const [empresaId] = useState(id);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      const userDoc = doc(db, "Empresa", id);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        setUserProfile(userSnap.data());
        setUserId(userSnap.id);
      } else {
        setUserProfile(null);
        alert("No such document!");
      }
    };

    getUserProfile();
  }, [id]);

  const handleRegister = async () => {
    const success = await registerVaga(tipo, empresa, detalhes, salario, exigencias, area, local, vaga, empresaId);
    if (success) {
      alert("Vaga Cadastrada com sucesso");
      navigate(`/homeempresa/${id}`);
    } else {
      alert("Falha ao criar uma vaga, tente novamente.");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <input
        type="text"
        placeholder="Nome da vaga"
        value={vaga}
        onChange={(e) => setVaga(e.target.value)}
      />
      <input
        type="text"
        placeholder="Detalhes da vaga"
        value={detalhes}
        onChange={(e) => setDetalhes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Area especifica"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome da empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salario"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
      />
      <input
        type="text"
        placeholder="Presencial ou online?"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Local da empresa"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      <input
        type="textarea"
        placeholder="Qual as certificaçoes nescessarias?"
        value={exigencias}
        onChange={(e) => setExigencias(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
