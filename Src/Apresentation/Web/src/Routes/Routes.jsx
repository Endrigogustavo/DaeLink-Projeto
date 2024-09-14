import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import Home from '../Pages/Home/Home';
import Logout from '../Pages/Login/Logout';

import Homeuser from '../Pages/PCD/Home/Home';
import Homeempresa from '../Pages/Empresa/Home/Home';

import Error404 from '../Pages/Error/TelaErro404'

import LoginE from '../Pages/Login/LoginEmpresa';
import CadastroEmpresa from '../Pages/Cadastro/CadastroEmpresa';
import CadastrarVaga from '../Pages/Empresa/Vagas/CriarVagas';
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos';
import Vagas from '../Pages/PCD/Vagas/ListarVagas/Vagas';
import ProfileAdd from '../Pages/Empresa/Profile/Profile';
import AddPessoa from '../Pages/Empresa/Vagas/AdicionarPessoa';
import VisualizarProcessosEmpresa from '../Pages/Empresa/Vagas/Visualizar_Processos';
import VisualizarPessoasVaga from '../Pages/Empresa/Vagas/VisualizarPessoas';
import VisualizarDocumentos from '../Pages/Empresa/Vagas/VisualizarDocumentos';
import PerfilEmpresa from '../Pages/Empresa/Profile/PerfilEmpresa';
import EditEmpresa from '../Pages/Empresa/Profile/EditarPerfilEmpresa';
import ChatEmpresa from '../Pages/Empresa/Chat/Chat';
import EditVaga from '../Pages/Empresa/Vagas/AtualizarVaga'

import LoginU from '../Pages/Login/LoginUser';
import CadastroUser from '../Pages/Cadastro/CadastrarUser';
import EntrarVaga from '../Pages/PCD/Vagas/EntrarVaga/Entrar_Vaga';
import VisualizarProcessosUser from '../Pages/PCD/Vagas/VisualizarProcessos/Visualizar_Processos';
import EnviarDocumentos from '../Pages/PCD/Vagas/EnviarDocumentos/Enviar_documentos';
import Profile from '../Pages/PCD/Profile/Profile';
import Empresas from '../Pages/PCD/Empresas/Empresas';
import List from '../Components/Listar/Listar';
import EditarUser from '../Pages/PCD/Profile/Editar';
import VisualizarPerfilEmpresa from '../Pages/PCD/Profile/PerfilEmpresa';
import ChatPCD from '../Pages/PCD/Chat/Chat';

import PrivateRoute from '../Security/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='*' element={<Error404 />} />

        {/* Rotas privadas da empresa */}
        <Route path="/" element={<PrivateRoute allowedRoles={['Empresa']} />}>
          <Route path="/homeempresa/cadastrovaga/:id" element={<CadastrarVaga />} />
          <Route path="/candidatos/:idempresa" element={<Candidatos />} />
          <Route path="/homeempresa/:id" element={<Homeempresa />} />
          <Route path='/addpessoa/:id/' element={<AddPessoa />} />
          <Route path="/profileadd/:id/:idempresa" element={<ProfileAdd />} />
          <Route path="/processos/:id" element={<VisualizarProcessosEmpresa />} />
          <Route path="/visualizarpessoas/:vagaId" element={<VisualizarPessoasVaga />} />
          <Route path="/visualizardocumentos/:id/:vagaId" element={<VisualizarDocumentos />} />
          <Route path="/editempresa/:id" element={<EditEmpresa />} />
          <Route path="/perfilempresa/:id" element={<PerfilEmpresa />} />
          <Route path="/chat/:id/:idempresa" element={<ChatEmpresa />} />
          <Route path="/atualizarvaga/:vagaId" element={<EditVaga />} />
        </Route>

        {/* Rotas livres da empresa */}
        <Route path="/candidatos" element={<Candidatos />} />
        <Route path="/cadastroempresa" element={<CadastroEmpresa />} />
        <Route path="/list" element={<List />} />
        <Route path="/logine" element={<LoginE />} />

        {/* Rotas privadas do usuario */}
        <Route path="/" element={<PrivateRoute allowedRoles={['PCD']} />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/homeuser/:id" element={<Homeuser />} />
          <Route path="/homeuser/vagas/:id" element={<Vagas />} />
          <Route path="/homeuser/empresas/:id" element={<Empresas />} />
          <Route path="/entrarvaga/:vaga" element={<EntrarVaga />} />
          <Route path="/enviardocumento/:id/:vagaId" element={<EnviarDocumentos />} />
          <Route path="/homeuser/processos/:encryptedId" element={<VisualizarProcessosUser />} />
          <Route path="/userprofile/:id" element={<Profile />} />
          <Route path="/edituser/:id" element={<EditarUser />} />
          <Route path="/visualizperfilempresa/:id" element={<VisualizarPerfilEmpresa />} />
          <Route path="/chatpcd/:encryptedId/:empresaId" element={<ChatPCD />} />
          <Route path="/vagas" element={<Vagas />} />
        </Route>

        {/* Rotas livres do usuario */}
        <Route path="/cadastrouser" element={<CadastroUser />} />
        <Route path="/empresas/" element={<Empresas />} />
        <Route path="/loginu" element={<LoginU />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
