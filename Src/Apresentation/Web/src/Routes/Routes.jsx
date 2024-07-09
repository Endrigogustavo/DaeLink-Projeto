import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home/Home';
import Logout from '../Components/Login/Logout';

import Homeuser from '../Pages/PCD/Home/Home';
import Homeempresa from '../Pages/Empresa/Home/Home';

import LoginE from '../Components/Login/LoginEmpresa';
import CadastroEmpresa from '../Components/Cadastro/CadastroEmpresa';
import CadastrarVaga from '../Pages/Empresa/Vagas/CriarVagas'
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos';
import Vagas from '../Pages/PCD/Vagas/Vagas';
import ProfileAdd from '../Pages/Empresa/Profile/Profile';

import LoginU from '../Components/Login/LoginUser';
import CadastroUser from '../Components/Cadastro/CadastrarUser';
import EntrarVaga from '../Pages/PCD/Vagas/Entrar_Vaga'
import VisualizarProcessos from '../Pages/PCD/Vagas/Visualizar_Processos'
import EnviarDocumentos from '../Pages/PCD/Vagas/Enviar_documentos'
import Profile from '../Pages/PCD/Profile/Profile';

import List from '../Components/Listar/Listar';
import Navbar from '../Components/Navbar/Navbar';

import PrivateRoute from '../Auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<PrivateRoute allowedRoles={['Empresa']} />}>
        <Route path="/homeempresa/cadastrovaga/:id" element={<CadastrarVaga />} />
          <Route path="/candidatos" element={<Candidatos />} />
          <Route path="/homeempresa/:id" element={<Homeempresa />} />
          <Route path="/profileadd/:id" element={<ProfileAdd />} />
        </Route>
        <Route path="/cadastroempresa" element={<CadastroEmpresa />} />
        <Route path="/list" element={<List />} />
        <Route path="/logine" element={<LoginE />} />

        <Route path="/" element={<PrivateRoute allowedRoles={['PCD']} />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/homeuser/:id" element={<Homeuser />} />
          <Route path="/homeuser/vagas/:id" element={<Vagas />} />
          <Route path="/entrarvaga/:id/:vagaId" element={<EntrarVaga />} />
          <Route path="/enviardocumento/:id/:vagaId" element={<EnviarDocumentos />} />
          <Route path="/homeuser/processos/:id" element={<VisualizarProcessos />} />
        </Route>
        
        <Route path="/cadastrouser" element={<CadastroUser />} />
        <Route path="/loginu" element={<LoginU />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
