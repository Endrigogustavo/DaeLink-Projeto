import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Homeuser from '../Pages/PCD/Home/Home';
import Homeempresa from '../Pages/Empresa/Home/Home';
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos';
import Vagas from '../Pages/PCD/Vagas/Vagas';
import Profile from '../Pages/PCD/Profile/Profile';
import LoginU from '../Components/Login/LoginUser';
import LoginE from '../Components/Login/LoginEmpresa';
import Logout from '../Components/Login/Logout';
import CadastroUser from '../Components/Cadastro/CadastrarUser';
import CadastroEmpresa from '../Components/Cadastro/CadastroEmpresa';
import List from '../Components/Listar/Listar';
import CadastrarVaga from '../Pages/Empresa/Vagas/CriarVagas'
import Entrar_Vaga from '../Pages/PCD/Vagas/Entrar_Vaga'

import Navbar from '../Components/Navbar/Navbar';

import PrivateRoute from '../Auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/homeempresa/cadastrovaga/:id" element={<CadastrarVaga />} />

        <Route path="/" element={<PrivateRoute allowedRoles={['Empresa']} />}>
          <Route path="/candidatos" element={<Candidatos />} />
          <Route path="/homeempresa/:id" element={<Homeempresa />} />
        </Route>
        <Route path="/cadastroempresa" element={<CadastroEmpresa />} />
        <Route path="/list" element={<List />} />
        <Route path="/logine" element={<LoginE />} />

        <Route path="/" element={<PrivateRoute allowedRoles={['PCD']} />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/homeuser" element={<Homeuser />} />
        </Route>
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/cadastrouser" element={<CadastroUser />} />
        <Route path="/loginu" element={<LoginU />} />
        <Route path="/entrarvaga/:id" element={<Entrar_Vaga />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
