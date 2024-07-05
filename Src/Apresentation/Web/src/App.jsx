import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import Vagas from './Components/Vagas/Vagas'
import Profile from './Components/Profile/Profile'

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />


    </>
  )
}

export default App
