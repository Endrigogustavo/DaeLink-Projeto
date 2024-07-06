import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Empresa/Home/Home';
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos';
import Vagas from '../Pages/PCD/Vagas/Vagas';
import Profile from '../Pages/PCD/Profile/Profile';
import Login from '../Components/Login/Login';
import Logout from '../Components/Login/Logout';
import Cadastro from '../Components/Cadastro/Cadastrar';
import CadastroImg from '../Components/Cadastro-Img/Cadastro-Img';

import PrivateRoute from '../Auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastroimagem" element={<CadastroImg />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/candidatos" element={<Candidatos />} />
        </Route>
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
