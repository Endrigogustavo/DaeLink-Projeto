
import './ExtraTailwind.css'


import Navbar from '../../Components/Navbar/Navbar'
import Banner from './Banner';
import About from './About';
import Footer from '../../Components/Footer/Footer'
import Sliders from './Sliders';
import Carousel from './Carousel';



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
