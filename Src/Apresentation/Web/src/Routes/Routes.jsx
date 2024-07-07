import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Empresa/Home/Home';
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos';
import Vagas from '../Pages/PCD/Vagas/Vagas';
import Profile from '../Pages/PCD/Profile/Profile';
import LoginU from '../Components/Login/LoginUser';
import LoginE from '../Components/Login/LoginEmpresa';
import Logout from '../Components/Login/Logout';
import CadastroUser from '../Components/Cadastro/CadastrarUser';
import CadastroEmpresa from '../Components/Cadastro/CadastroEmpresa';
import CadastroImg from '../Components/Cadastro-Img/Cadastro-Img';
import List from '../Components/Listar/Listar';
import Navbar from '../Components/Navbar/Navbar';

import PrivateRoute from '../Auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loginu" element={<LoginU />} />
        <Route path="/logine" element={<LoginE />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/list" element={<List />} />
        <Route path="/cadastrouser" element={<CadastroUser />} />
        <Route path="/cadastroempresa" element={<CadastroEmpresa />} />
        <Route path="/cadastroimagem" element={<CadastroImg />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/candidatos" element={<Candidatos />} />
        </Route>
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
