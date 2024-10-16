import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { StatusBar } from 'react-native';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#111827" barStyle="primary"/>
      <Routes />
    </NavigationContainer>
  );
}
