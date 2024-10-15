
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar';
import BannerPCD from './BannerPCD'
import AboutPCD from './AboutPCD';
import AppPCD from './AppPCD';
import Footer from '../../../Components/Footer/Footer'
import Sliders from '../../../Pages/Home/Sliders';
import { useEffect } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

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

  return (
    <>

      <Navbar />
      <BannerPCD />
      <AboutPCD />
      <AppPCD />
      <Sliders />
      <Footer />

    </>
  )
}

export default Home
