import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthChange, getUserData } from '../Auth/Auth'; 
import CarregamentoTela from "../Components/TelaCarregamento/Carregamento"

const PrivateRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          console.log('User Data:', userData);
          setIsAuthenticated(true);
          setUserType(userData.tipo); 
        } catch (error) {
          console.error(error);
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
    return <CarregamentoTela/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/loginu" />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    if(userType.tipo == "Empresa")
    return <Navigate to="/homeempresa" />;
    if(userType.tipo == "PCD")
      return <Navigate to="/homeuser" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
