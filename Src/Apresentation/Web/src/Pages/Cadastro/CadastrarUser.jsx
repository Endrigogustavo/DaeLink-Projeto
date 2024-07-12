import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Auth/Auth';

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [trabalho, setTrabalho] = useState("");
  const [descrição, setDescrição] = useState("");
  const [idade, setIdade] = useState("");
  const [sobre, setSobre] = useState("");
  const [experiencias, setExperiencia] = useState("");
  const [deficiencia, setDeficiencia] = useState("");
  const [tipo, setTipo] = useState("PCD");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Verificar se o formato do e-mail é válido
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("O formato de email é invalido, tente novamente.");
      return;
    }

    const response = await registerUser(email, password, idade, deficiencia, descrição, trabalho, image, background, sobre, experiencias, tipo, {});
    if (response.success) {
      alert("Cadastrado com sucesso");
      navigate(`/homeuser/${response.uid}`);
    } else {
      alert("Falha ao criar um registro, tente novamente.");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
      <input type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Sobre você"
        value={sobre}
        onChange={(e) => setSobre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Suas experiencias"
        value={experiencias}
        onChange={(e) => setExperiencia(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="date"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <input
        type="text"
        placeholder="Area de atuação"
        value={trabalho}
        onChange={(e) => setTrabalho(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição do seu trabalho"
        value={descrição}
        onChange={(e) => setDescrição(e.target.value)}
      />
      <input
        type="text"
        placeholder="Deficiencia"
        value={deficiencia}
        onChange={(e) => setDeficiencia(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
