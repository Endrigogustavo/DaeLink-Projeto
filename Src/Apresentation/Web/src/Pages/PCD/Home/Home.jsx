
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar';
import BannerPCD from './BannerPCD'
import AboutPCD from './AboutPCD';
import AppPCD from './AppPCD';
import Footer from '../../../Components/Footer/Footer'
import Sliders from '../../../Pages/Home/Sliders';
import { useEffect } from 'react';




function Home() {

  useEffect(() =>{
    localStorage.removeItem('IdEmpresa');
    localStorage.removeItem('vagaId');
    localStorage.removeItem('IdDoc');
  })

  return (
    <>
    
      <Navbar/>
      <BannerPCD/>
      <AboutPCD/>
      <AppPCD/>
      <Sliders/>
      <Footer/>

    </>
  )
}

export default Home
