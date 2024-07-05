import Home from '../Pages/Empresa/Home/Home'
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos'
import Vagas from '../Pages/PCD/Vagas/Vagas'
import Profile from '../Pages/PCD/Profile/Profile'

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidatos" element={<Candidatos />} />
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
