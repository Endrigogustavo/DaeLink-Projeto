import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Auth/Auth';

const Logout = () => {
  //Função de navegação do site
  const navigate = useNavigate();

  const handleLogout = () => {
    //Função do Auth.jsx para deslogar
    logout();
    // Redireciona para a página de login após o logout
    navigate('/');
  };

  return (
    <div>
      <h2>Logout Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
