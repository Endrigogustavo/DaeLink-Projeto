import React, { useState } from 'react';
import { FaApple } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from "../../Database/Firebase"
import axios from 'axios'
import Cookies from 'js-cookie';
import { doc, getDoc } from 'firebase/firestore';


const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    auth.languageCode = 'it';

    const handleLogin = async () => {

        try {
            const PCDCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = PCDCredential.user.uid
         
            try {
                const PCDDocRef = doc(db, "PCD", uid);
                const GetPCDDoc = await getDoc(PCDDocRef);

                const EmpresaDocRef = doc(db, "Empresa", uid);
                const EmpresaDDoc = await getDoc(EmpresaDocRef);
    

                if(GetPCDDoc.exists()){
                    await axios.post('http://localhost:3000/cookie', {uid},{
                        withCredentials: true 
                    });
                    const id = uid;
                    localStorage.setItem('userId', id);
                    navigate(`/homeuser`);
                }
                if(EmpresaDDoc.exists()){
                    await axios.post('http://localhost:3000/cookie', {uid},{
                        withCredentials: true 
                    });
                    const id = uid;
                    localStorage.setItem('userId', id);
                    navigate(`/homeuser`);
                }
                else{

                }
                
            } catch (error) {
                alert('Erro ao fazer login, tente novamente.');
            console.log(error)
            }
    
            
        } catch (error) {
            alert('Erro ao fazer login, tente novamente.');
            console.log(error)
        }
    };

    return (
        <div className="px-6 py-10 rounded-3xl border-2 border-blue-600 w-full max-w-lg mx-auto">
            <h1 className="font-extrabold text-3xl">Bem Vindo!</h1>
            <p className="font-semibold text-wrap mt-2 text-black opacity-80">
                Preencha os campos de acordo com as informações:
            </p>
            <div className="mt-8">
                <div className="flex flex-col">
                    <label className="text-lg font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira seu Email "
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Senha</label>
                    <input
                        type="password"
                        className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira sua Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center mt-8">
                <button
                    onClick={handleLogin}
                    className="w-32 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-all"
                >
                    Login
                </button>
                <div className="w-full mt-4 text-center">
                    <p className="mb-2">
                        Não possui conta? <Link to="/cadastro" className="text-blue-700">Cadastre-se</Link>
                    </p>
                    <div className="flex flex-col gap-2 justify-center items-center">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
