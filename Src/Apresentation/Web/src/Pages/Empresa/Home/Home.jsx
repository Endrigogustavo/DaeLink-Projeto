
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar'
import BannerEmpresa from './BannerEmpresa';
import AboutEmpresa from './AboutEmpresa';
import Footer from '../../../Components/Footer/Footer'
import ImageEmpresa from './ImageEmpresa';



function Home() {
  
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
