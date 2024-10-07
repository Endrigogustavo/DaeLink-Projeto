import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import Home from '../Pages/Home/Home';
import Logout from '../Pages/Login/Logout';

import Homeuser from '../Pages/PCD/Home/Home';
import Homeempresa from '../Pages/Empresa/Home/Home';

import Error404 from '../Pages/Error/TelaErro404'


import CadastroEmpresa from '../Pages/Cadastro/CadastroEmpresa';
import CadastrarVaga from '../Pages/Empresa/Vagas/CriarVaga/CriarVagas';
import Candidatos from '../Pages/Empresa/Candidatos/Candidatos';
import Vagas from '../Pages/PCD/Vagas/ListarVagas/Vagas';
import ProfileAdd from '../Pages/Empresa/Profile/Profile';
import AddPessoa from '../Pages/Empresa/Vagas/AdicionarPessoa';
import VisualizarProcessosEmpresa from '../Pages/Empresa/Vagas/VisualizarProcessos/Visualizar_Processos';
import VisualizarPessoasVaga from '../Pages/Empresa/Vagas/VisualizarPessoas/VisualizarPessoas';
import VisualizarDocumentos from '../Pages/Empresa/Vagas/VisualizarDocumentos';
import PerfilEmpresa from '../Pages/Empresa/Profile/PerfilEmpresa';
import EditEmpresa from '../Pages/Empresa/Profile/EditarPerfilEmpresa';
import ChatEmpresa from '../Pages/Empresa/Chat/Chat';
import EditVaga from '../Pages/Empresa/Vagas/AtualizarVaga/AtualizarVaga'

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
import Apuração from '../Pages/PCD/Vagas/VisualizarProcessos/VisualizarApuração'
import AtualizarDoc from '../Pages/PCD/Vagas/EnviarDocumentos/AtualizarDocumento'
import VagasInfo from '../Pages/PCD/Vagas/EntrarVaga/VagaInfo'


import Adm from '../Pages/Admin/Dashboard'
import LoginAdm from '../Pages/Admin/Login'
import PCDadm from '../Pages/Admin/PCD'
import EmpresaAdm from '../Pages/Admin/Empresas'
import VagasAdm from '../Pages/Admin/Vagas'

import SelecionarCadastro from '../Pages/Cadastro/SelecionarUser/SelecionarUser'
import PrivateRoute from '../Security/PrivateRoute';
import Termos from '../Pages/Cadastro/TermosUso'


import Watson from '../Watson/Watson'
function App() {
  return (
    <BrowserRouter>
      <Watson />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='*' element={<Error404 />} />

        {/* Rotas privadas da empresa */}
        <Route path="/" element={<PrivateRoute allowedRoles={['Empresa']} />}>
          <Route path="/homeempresa/cadastrovaga/" element={<CadastrarVaga />} />
          <Route path="/candidatos/:idempresa" element={<Candidatos />} />
          <Route path="/homeempresa/" element={<Homeempresa />} />
          <Route path='/addpessoa/:id' element={<AddPessoa />} />
          <Route path="/profileadd/:id/" element={<ProfileAdd />} />
          <Route path="/processos/" element={<VisualizarProcessosEmpresa />} />
          <Route path="/visualizarpessoas/:vagaId" element={<VisualizarPessoasVaga />} />
          <Route path="/visualizardocumentos/:id/:vagaId" element={<VisualizarDocumentos />} />
          <Route path="/editempresa/" element={<EditEmpresa />} />
          <Route path="/perfilempresa/" element={<PerfilEmpresa />} />
          <Route path="/chat/:id" element={<ChatEmpresa />} />
          <Route path="/atualizarvaga/:vagaId" element={<EditVaga />} />
          <Route path="/candidatos" element={<Candidatos />} />
        </Route>

        {/* Rotas livres da empresa */}
        <Route path="/cadastroempresa" element={<CadastroEmpresa />} />
        <Route path="/list" element={<List />} />

        {/* Rotas privadas do usuario */}
        <Route path="/" element={<PrivateRoute allowedRoles={['PCD']} />}>
          <Route path="/profile/" element={<Profile />} />
          <Route path="/homeuser" element={<Homeuser />} />
          <Route path="/homeuser/vagas/" element={<Vagas />} />
          <Route path="/homeuser/empresas/" element={<Empresas />} />
          <Route path="/entrarvaga/:vaga" element={<EntrarVaga />} />
          <Route path="/vagainfo/:vagaId" element={<VagasInfo />} />
          <Route path="/enviardocumento/:vagaId" element={<EnviarDocumentos />} />
          <Route path="/atualizardocumento/:vagaId/:idDoc" element={<AtualizarDoc />} />
          <Route path="/homeuser/processos/" element={<VisualizarProcessosUser />} />
          <Route path="/userprofile/" element={<Profile />} />
          <Route path="/edituser/" element={<EditarUser />} />
          <Route path="/visualizperfilempresa/:id" element={<VisualizarPerfilEmpresa />} />
          <Route path="/chatpcd/:empresaId" element={<ChatPCD />} />
          <Route path="/vagas" element={<Vagas />} />
          <Route path="/ApuraçãoPCD/:encryptedId/:vagaId" element={<Apuração />} />
        </Route>

        {/* Rotas livres do usuario */}
        <Route path="/cadastrouser" element={<CadastroUser />} />
        <Route path="/empresas" element={<Empresas />} />



        <Route path="/adm/:uid" element={<Adm />} />
        <Route path="/pcdadm/:id" element={<PCDadm />} />
        <Route path="/empresaadm/:id" element={<EmpresaAdm />} />
        <Route path="/vagaadm/:vagaId" element={<VagasAdm />} />
        <Route path="/loginadm" element={<LoginAdm />} />


        <Route path="/loginu" element={<LoginU />} />
        <Route path="/cadastro" element={<SelecionarCadastro />} />
        <Route path="/termos" element={<Termos />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
