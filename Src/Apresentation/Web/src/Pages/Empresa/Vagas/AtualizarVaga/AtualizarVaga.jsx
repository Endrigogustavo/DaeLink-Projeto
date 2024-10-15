import React, { useState, useEffect } from "react";
import { doc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db, storage, auth } from "../../../../Database/Firebase";
import { useParams, useNavigate } from 'react-router-dom';
import FormEditarVaga from "./FormAtualizar";
import Navbar from "../../Navbar/Navbar";


const EditarVaga = () => {
  // Função de navegação do site
  const navigate = useNavigate();
  // Utilizado para pegar o id do usuario e da vaga na tela anterior

  return (
    <>
      <Navbar/>
      <FormEditarVaga/>
    
    </>

  )
};

export default EditarVaga;
