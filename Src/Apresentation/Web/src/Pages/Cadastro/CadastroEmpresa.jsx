import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmpresa } from '../../Auth/Auth';

const Register = () => {
  //Variaveis onde as informações serão setadas
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  //Variavel para fazer gerenciamento de nivel de acesso
  const [tipo] = useState("Empresa");
  //Função de navegação do site
  const navigate = useNavigate();

  // Borão para fazer Cadastro
  const handleRegister = async () => {
    // Verificar se o formato do e-mail é válido
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("O formato de email é invalido, tente novamente.");
      return;
    }


    //Função do Auth.jsx para fazer login enviando os parametros do form
    const response = await registerEmpresa(email, password, cnpj, endereco, cep, tipo, { name });
    if (response.success) {
      alert("Cadastrado com sucesso");
      navigate(`/homeempresa/${response.uid}`);
    } else {
      alert("Falha ao criar um registro, tente novamente.");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <input
        type="text"
        placeholder="CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        placeholder="Cnpj"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />
      <input
        type="text"
        placeholder="endereco"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
