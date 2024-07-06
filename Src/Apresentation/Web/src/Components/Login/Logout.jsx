// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Auth/Auth';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a página de login após o logout
  };

  return (
    <div>
      <h2>Logout Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
