import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CarregamentoTela from "../Components/TelaCarregamento/Carregamento";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const PrivateRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      console.log(user)
      if (user) {
        try {
          if (user.displayName) { 
            setUserType(user.displayName);
            setIsAuthenticated(true);
          } else {
            console.error("Tipo de usuário não encontrado.");
            setIsAuthenticated(false);
          }
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

    return () => unsubscribe(); // Cleanup ao desmontar
  }, []);

  // Tela de carregamento enquanto verifica autenticação
  if (loading) {
    return <CarregamentoTela />;
  }

  // Redirecionar para login se não autenticado
  if (!isAuthenticated) {
    return <Navigate to="/loginu" />;
  }

  // Redirecionar com base no tipo de usuário
  if (allowedRoles && !allowedRoles.includes(userType)) {
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

  // Renderizar a rota protegida
  return <Outlet />;
};

export default PrivateRoute;
