
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar'
import BannerEmpresa from './BannerEmpresa';
import AboutEmpresa from './AboutEmpresa';
import Footer from '../../../Components/Footer/Footer'
import ImageEmpresa from './ImageEmpresa';
import { useEffect } from 'react';



function Home() {

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
