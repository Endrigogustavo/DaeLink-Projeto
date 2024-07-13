import React, {useState , useEffect}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import {doc, getDoc} from 'firebase/firestore'
import load from '../load/load';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const handleEditar = () => {
    navigation.navigate("editar");
  };

  const handleConfig = () => {
    navigation.navigate("configuração");
  };

useEffect(() => {
const fetchUserData = async() => {
  const docRef = doc(db, 'PCD', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    setUserData(docSnap.data());
  }else{
    console.log("Documento não encontrado")
  }
};fetchUserData();
},[]);

if (!userData) {
  return (
    <View style={load.container2}>
    <View style={load.carregando}>
      <Image source={require('../../img/logo.png')} style={load.logo} />
      <Text style={load.text}>Loading...</Text>
      </View>
    </View>
  );
}
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={require('../../img/background.jpg')}
          style={styles.headerBackground}
        />
        <Image
           source={{ uri: userData.imageUrl || 'https://via.placeholder.com/150' }} 
          style={styles.perfilImage}
        />
        <Text style={styles.name}>Usuário</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.TituloSecao}>Informações Pessoais</Text>
        <View style={styles.infocaixa}>
          <Text style={styles.infoText}>Nome Completo: {userData.name}</Text>
          <Text style={styles.infoText}>Email: {auth.currentUser.email}</Text>
          <Text style={styles.infoText}>Tipo: {userData.tipo}</Text>
          <Text style={styles.infoText}>Idade: {userData.idade}</Text>
        </View>

        <Text style={styles.TituloSecao}>Configurações</Text>
        <View style={styles.opcoesContainer}>
          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleEditar) }>
            <FontAwesome name="user" size={24} color="#007bff" />
            <Text style={styles.opcoesText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleConfig)}>
            <FontAwesome name="cogs" size={24} color="#007bff" />
            <Text style={styles.opcoesText}>Config</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={() => navigation.navigate('Help')}>
            <FontAwesome name="question-circle" size={24} color="#007bff" />
            <Text style={styles.opcoesText}>Ajuda</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.TituloSecao}>Descrição</Text>
        <View style={styles.TrabContainer}>
          <View style={styles.caixaTrab}>
            <Text style={styles.TitTrab}>Tipo de Deficiencia: {userData.deficiencia}</Text>
            <Text style={styles.compTrab}>Descrição: {userData.descrição}</Text>
            <Text style={styles.LocalTrab}>Cidade, Estado</Text>
          </View>
          <Text style={styles.TituloSecao}>Suas Vagas</Text>
          <View style={styles.caixaTrab}>
            <Text style={styles.TitTrab}>Trabalho: {userData.trabalho}</Text>
            <Text style={styles.compTrab}>Outra Empresa</Text>
            <Text style={styles.TitTrab}>experiência:</Text>
            <Text style={styles.LocalTrab}> {userData.experiencias}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
