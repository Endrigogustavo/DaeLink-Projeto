import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../Auth/Auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult ,signInWithRedirect, signOut} from "firebase/auth";
import ImgUser from '../../Img/LoginUser.png'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  auth.languageCode = 'it';



  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password); // Chama sua função de login

      if (userData) {
        console.log("User data:", userData); // Verifique os dados do usuário recebidos
        navigate(`/homeuser/${userData.uid}`); // Navega para a página usando o UID retornado
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

  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

  return (

    <>
      <div className="bg-white relative lg:py-20">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img src={ImgUser} className="btn-" />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">

              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">

                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Login - Usuario</p>

                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <div class="my-5">
                    <button onClick={handleGoogleLogin} class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                      <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt="" /> <span>Login with Google</span>
                    </button>
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Email</p>
                    <input value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="John" type="text" className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Senha</p>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" type="password" className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"/>
                  </div>
                  <div className="relative">
                    <button onClick={handleLogin}>
                      <a className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease">Logar</a>
                    </button>
                    <br /><br />
                    <p>Não tem uma conta ainda? <Link to="/cadastrouser">Cadastrar agora</Link></p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default Login;
