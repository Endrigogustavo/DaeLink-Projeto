import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../Database/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { decrypt, encrypt } from '../../../../Security/Cryptography_Rotes';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento"
import "./ProcessosStyle.css";
import Navbar from '../../Navbar/Navbar';
import Processos_Page from './ProcessosPage';


function Visualizar_Processo() {
    return (
        <>
            <Navbar />
            <Processos_Page />
        </>
    );
}

export default Visualizar_Processo;
