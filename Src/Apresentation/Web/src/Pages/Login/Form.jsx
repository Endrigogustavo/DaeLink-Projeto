import './FormCss.css'
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../Auth/Auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult, signInWithRedirect, signOut } from "firebase/auth";

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    auth.languageCode = 'it';



    const handleLogin = async () => {
        try {
            const userData = await loginUser(email, password);

            if (userData) {
                console.log("User data:", userData);
                navigate(`/homeuser/${userData.uid}`);
            } else {
                alert("Failed to login. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            alert("Failed to login. Please check your credentials.");
        }
    };


    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("User:", user);
            console.log("Token:", token);
            navigate('/homeuser');
        } catch (error) {
            console.error("Google login error:", error.message);
            alert("Failed to login with Google. Please try again.");
        }
    };


    return (

        <>
            <div className="px-10 py-20 rounded-3xl border-2 border-blue-300">
                <div>
                    <h1 className="font-extrabold text-3xl ">Bem Vindo!</h1>
                    <p className="fonte-semibold text-wrap w-96 mt-2 text-black opacity-80">Preencha os campos de acordo com as informações:</p>
                </div>
                <div className="mt-8">
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Email</label>
                        <input
                            className='w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent'
                            placeholder="Insira seu Email '-'"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Password</label>
                        <input
                            className='w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent'
                            placeholder="Insira sua Senha :)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col mt-8 items-center">
                    <button onClick={handleLogin} className=" w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all">Login</button>
                    <div className="w-full mt-4">
                        <p className="mb-2">Não possui conta? <Link to="/cadastrouser" className="link-cadastre ">Cadastre-se</Link></p>
                        <div className='flex flex-col gap-2 justify-center'>
                            <button  className='flex items-center justify-center w-52 text-sm text-white bg-gray-900 rounded-full py-2 px-4'>
                                <FaApple  className='mr-2 text-2xl'/>
                                Continuar com Apple</button>
                            <button onClick={handleGoogleLogin} className='flex items-center justify-center w-52 text-sm border border-gray-400 rounded-full py-2 px-4'>
                                <FcGoogle  className='mr-1 text-2xl'/>
                                Continuar com Google</button>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )


}

export default Form;