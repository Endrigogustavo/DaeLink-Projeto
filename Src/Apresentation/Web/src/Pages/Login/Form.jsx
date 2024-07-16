import React, { useState } from 'react';
import { FaApple } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../Auth/Auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    auth.languageCode = 'it';

    const handleLogin = async () => {
        try {
            const userData = await loginUser(email, password);
            if (userData) {
                navigate(`/homeuser/${userData.uid}`);
            } else {
                alert('Failed to login. Please check your credentials.');
            }
        } catch (error) {
            alert('Failed to login. Please check your credentials.');
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            navigate('/homeuser');
        } catch (error) {
            alert('Failed to login with Google. Please try again.');
        }
    };

    return (
        <div className="px-6 py-10 rounded-3xl border-2 border-blue-300 w-full max-w-lg mx-auto">
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
                        placeholder="Insira seu Email '-'"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-lg font-medium">Senha</label>
                    <input
                        type="password"
                        className="w-full border-2 border-gray-300 rounded-full p-4 mt-1 bg-transparent"
                        placeholder="Insira sua Senha :)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center mt-8">
                <button
                    onClick={handleLogin}
                    className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all"
                >
                    Login
                </button>
                <div className="w-full mt-4 text-center">
                    <p className="mb-2">
                        Não possui conta? <Link to="/cadastrouser" className="text-blue-500">Cadastre-se</Link>
                    </p>
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <button className="flex items-center justify-center w-52 text-sm text-white bg-gray-900 rounded-full py-2 px-4">
                            <FaApple className="mr-2 text-2xl" />
                            Continuar com Apple
                        </button>
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center w-52 text-sm border border-gray-400 rounded-full py-2 px-4"
                        >
                            <FcGoogle className="mr-1 text-2xl" />
                            Continuar com Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
