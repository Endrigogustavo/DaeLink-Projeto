import React, { useState, useEffect } from 'react';
import { db, auth } from '../../Database/Firebase'; // Importe sua configuração do Firebase
import { doc, getDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './Navbar'

export default function NavbarType() {
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Pega os dados com base no perfil de empresa logado utilizando o auth do Firebase
    const AuthProfile = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => AuthProfile();
  }, []);

  useEffect(() => {

    const fetchUserType = async () => {
      try {
        const userId = user.uid; // Obtenha o ID do usuário autenticado
        let userDoc;

        // Verifique se o usuário está na coleção PCD
        userDoc = await db.collection('PCD').doc(userId).get();
        if (userDoc.exists) {
          setUserType(userDoc.data().tipo);
          return;
        }

        // Se não estiver na coleção PCD, verifique a coleção Empresa
        userDoc = await firestore.collection('Empresa').doc(userId).get();
        if (userDoc.exists) {
          setUserType(userDoc.data().tipo);
        }
      } catch (error) {
        console.error('Erro ao obter o tipo de usuário:', error);
      }

    };

    fetchUserType();
  }, []);

  return (
    <div>
      <Navbar userType={userType} />
    </div>
  );


}
