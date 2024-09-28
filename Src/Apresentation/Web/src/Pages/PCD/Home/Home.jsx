
import '../../../Pages/Home/ExtraTailwind.css'


import Navbar from '../Navbar/Navbar';
import BannerPCD from './BannerPCD'
import AboutPCD from './AboutPCD';
import AppPCD from './AppPCD';
import Footer from '../../../Components/Footer/Footer'
import Sliders from '../../../Pages/Home/Sliders';
import WatsonChat from '../../../Watson/Watson'




function Home() {

  return (
    <>
    
      <Navbar/>
      <WatsonChat/>
      <BannerPCD/>
      <AboutPCD/>
      <AppPCD/>
      <Sliders/>
      <Footer/>

    </>
  )
}

export default Home
