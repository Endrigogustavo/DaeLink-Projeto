// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home/home';
import Login from './src/pages/Login/login';
import Perfil from './src/pages/Perfil/perfil';
import editar from './src/pages/Perfil/editar_perfil';
import Config from './src/pages/configuracao/configuracao';
import Vagas from './src/pages/Vaga/vagas';
import Documentos from './src/pages/Vaga/enviar_Documentos';
import Processo from './src/pages/Vaga/visualizar_Processos';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen  name="perfil" component={Perfil} />
        <Stack.Screen  name="editar" component={editar} />
        <Stack.Screen  name="configuração" component={Config} />
        <Stack.Screen  name="vaga" component={Vagas} />
        <Stack.Screen  name="documento" component={Documentos} />
        <Stack.Screen  name="processo" component={Processo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
