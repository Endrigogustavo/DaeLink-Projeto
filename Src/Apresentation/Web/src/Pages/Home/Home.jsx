
import './ExtraTailwind.css'


import Navbar from '../../Components/Navbar/NavbarType'
import Banner from './Banner';
import About from './About';
import Footer from '../../Components/Footer/Footer'
import Sliders from './Sliders';
import Carousel from './Carousel';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../Database/Firebase'
import Cookies from 'js-cookie';
import axios from 'axios';


const Home = () => {
  useEffect(() => {
    const geolocalização = () =>{
      if('geolocation' in navigator){
  navigator.geolocation.watchPosition(function(position){
      },
      function(error){
        console.log(error)
      },{enableHighAccuracy: true, maximumAge: 3000, timeout: 3000})
      navigator.geolocation.clearWatch(geolocalização)
      } else{
        alert("Não foi possivel pegar a localização")
      }
    
    }

    geolocalização()
   
    localStorage.removeItem('userId');
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    const logout = async () => {
      try {
        await signOut(auth);
        await axios.post('http://localhost:3000/logout', {
          withCredentials: true
      });
      } catch (error) {
        console.error("Logout error: ", error);
      }
    };

    logout()
  }, [])

  return (
    <>


      <Navbar />
      <Banner />
      <About />
      <Carousel />
      <Sliders />
      <Footer />

    </>
  )
}

export default Home
