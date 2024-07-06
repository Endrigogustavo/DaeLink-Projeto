// src/components/Login.jsx
import React from 'react';
import { login } from './Auth';

const Login = () => {
  const handleLogin = () => {
    login(); // Chama a função de login ao clicar no botão
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
