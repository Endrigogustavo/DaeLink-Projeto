import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthChange, getUserData } from '../Auth/Auth';
import CarregamentoTela from "../Components/TelaCarregamento/Carregamento";

const PrivateRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setLoading(true); // Garantir que a tela de carregamento apareça até a verificação concluir

      if (user) {
        try {
          const userData = await getUserData(user.uid);
          setIsAuthenticated(true);
          setUserType(userData.tipo);
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
        setUserType(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <CarregamentoTela />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/loginu" />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    // Redirecionamento com base no tipo de usuário
    switch (userType) {
      case 'Empresa':
        return <Navigate to="/homeempresa" />;
      case 'PCD':
        return <Navigate to="/homeuser" />;
      case 'Adm':
        return <Navigate to="/adm" />;
      default:
        return <Navigate to="/loginu" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
