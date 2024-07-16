
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar'
import Banner from '../../../Pages/Home/Banner';
import About from '../../../Pages/Home/About';
import Footer from '../../../Components/Footer/Footer'
import Sliders from '../../../Pages/Home/Sliders';
import Carousel from '../../../Pages/Home/Carousel';



function Home() {

  return (
    <>
      
   
      <Navbar/>
      <Banner/>
      <About/>
      <Carousel/>
      <Sliders/>
      <Footer/>

    </>
  )
}

export default Home
