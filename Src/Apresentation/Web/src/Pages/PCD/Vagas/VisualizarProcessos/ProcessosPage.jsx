import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../../../../Database/Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { decrypt, encrypt } from '../../../../Security/Cryptography_Rotes';
import CarregamentoTela from "../../../../Components/TelaCarregamento/Carregamento"
import "./ProcessosStyle.css";
import ProcessosList from './ProcessosList';
import Navbar from '../../Navbar/Navbar';

import {
    FaSquareGithub, FaSquareXTwitter, FaSquareInstagram
} from "react-icons/fa6";


function Processos_Page() {
    const { encryptedId } = useParams();
    const decryptedId = decrypt(decodeURIComponent(encryptedId));

    return (
        <>
            <Navbar />
            <ProcessosList />

            <div className="w-full bg-gray-900 h-16 ">
                <div className="flex w-full h-full items-center justify-center gap-4">
                    <Link><FaSquareInstagram className="text-3xl text-gray-200 opacity-80  mediahover" /></Link>
                    <Link><FaSquareXTwitter className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                    <Link><FaSquareGithub className="text-3xl text-gray-200 opacity-80 mediahover" /></Link>
                </div>
            </div>

        </>
    );
}

export default Processos_Page;
