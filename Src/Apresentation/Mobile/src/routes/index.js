import { createStackNavigator } from "@react-navigation/stack";

import Carrosel from "../slides/Carrosel";
import Login from "../pages/Login/login";
import MyTabs from "../Tabs/tabs";
import Visualizar_Documento from "../pages/Vaga/Editar-Doc/visualizar_Documento";
import Processo from "../pages/Vaga/Processos/visualizar_Processos";
import Empresas from "../pages/empresa/empresa";
import PerfilEmpresa from "../pages/empresa/perfilEmpresa";
import Config from "../pages/configuracao/configuracao";
import Editar from "../pages/Perfil/editar_perfil";
import Documentos from "../pages/Vaga/Envia-Doc/enviar_Documentos";
import Editar_Documento from "../pages/Vaga/editar_documento";
import Perfil from '../pages/Perfil/perfil';


import Toast from 'react-native-toast-message';
import toastConfig from "../pages/Toast/toastConfig";
import Welcome from "../pages/welcome/welcome";
import Chat from "../pages/Chat/chat";
import Vagas from "../pages/Vaga/Visualizar-Vaga/vagas";
import EntrarVaga from "../pages/Vaga/Entrar-vaga/entrar_vaga";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen options={{ headerShown: false }} name="Carrosel" component={Carrosel} />
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={MyTabs} />

        <Stack.Screen name="vaga" component={Vagas} />
        <Stack.Screen name="Visualizar Documento" component={Visualizar_Documento} />
        <Stack.Screen options={{ headerShown: false }}  name="chat" component={Chat} />

        <Stack.Screen name="processo" component={Processo} />
        <Stack.Screen name="perfil" component={Perfil} />
        <Stack.Screen name="empresa" component={Empresas} />
        <Stack.Screen name="Perfil-Empresa" component={PerfilEmpresa} />
        <Stack.Screen name="configuração" component={Config} />

        <Stack.Screen name="editar" component={Editar} />
        <Stack.Screen name="documento" component={Documentos} />
        <Stack.Screen name="editar_Documento" component={Editar_Documento} />
        <Stack.Screen name="Entrar-Vaga" component={EntrarVaga} />
        <Stack.Screen options={{ headerShown: false }} name="slides" component={Carrosel} />
      </Stack.Navigator>
      
      <Toast config={toastConfig} />
    </>
  );
}
