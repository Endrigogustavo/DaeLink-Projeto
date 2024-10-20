
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar'
import BannerEmpresa from './BannerEmpresa';
import AboutEmpresa from './AboutEmpresa';
import Footer from '../../../Components/Footer/Footer'
import ImageEmpresa from './ImageEmpresa';
import { useEffect } from 'react';
import { auth } from '../../../Database/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios'


function Home() {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          await axios.post('http://localhost:3000/cookie', { uid }, {
            withCredentials: true
          });
        } catch (error) {
          console.error("Error posting cookie: ", error);
        }
      }
    });

    localStorage.removeItem('IdEmpresa');
    localStorage.removeItem('vagaId');
    localStorage.removeItem('IdDoc');
  })

  useEffect(() =>{
    localStorage.removeItem("Candidato")
    localStorage.removeItem("IdDoc")
    localStorage.removeItem("IdUser")
    localStorage.removeItem("IdUserDoc")
    localStorage.removeItem("chatId")
    localStorage.removeItem("vagaId")
  })
  
  return (
    <>
      <Navbar/>
      <BannerEmpresa/>
      <AboutEmpresa/>
      <ImageEmpresa/>
      <Footer/>
    </>
  )
}

export default Home
