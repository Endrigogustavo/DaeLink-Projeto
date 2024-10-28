import React, {useState , useCallback}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from './style';
import {doc, getDoc} from 'firebase/firestore'
import load from '../load/load';
import { format,differenceInYears } from 'date-fns'; 
import { ptBR } from 'date-fns/locale'


export default function Profile() {
      const [userData, setUserData] = useState(null);
      const navigation = useNavigation();
    
      const handleEditar = () => {
        navigation.navigate("editar");
      };
    
      const handleSignOut = () => {
        auth.signOut().then(() => {
          navigation.replace("Login");
        }).catch(error => alert(error.message));
      };

      const fetchUserData = useCallback(async () => {
        const docRef = doc(db, 'PCD', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Documento não encontrado");
        }
      }, []);
    
      useFocusEffect(
        useCallback(() => {
          fetchUserData();
        }, [fetchUserData])
      );

        if (!userData) {
          return (
            <View style={load.container2}>
            <View style={load.carregando}>
              <Image resizeMode='contain' source={require('../../img/logo.png')} style={load.logo} />
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={load.text}>Loading...</Text>
              </View>
            </View>
          );
        }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={{uri:userData.imageProfile }}
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
          <Text style={styles.infoText}>Nome: {userData.name}</Text>
          <Text style={styles.infoText}>Email: {auth.currentUser.email}</Text>
          <Text style={styles.infoText}>CID: {userData.tipo}</Text>
          <Text style={styles.infoText}> Nascimento: {format(new Date(userData.idade + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR })}</Text>
          <Text style={styles.infoText}>Idade: {differenceInYears(new Date(),new Date(userData.idade))}</Text>
          <Text style={styles.infoText}>Tipo de Deficiencia: {userData.deficiencia}</Text>
        </View>

        <Text style={styles.TituloSecao}>Configurações</Text>
        <View style={styles.opcoesContainer}>
          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleEditar) }>
            <FontAwesome name="user" size={24} color="#1D3FAD" />
            <Text style={styles.opcoesText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleSignOut)}>
            <FontAwesome name="sign-out" size={24} color="#1D3FAD" />
            <Text style={styles.opcoesText}>Sair</Text>
          </TouchableOpacity>

          </View>

        <Text style={styles.TituloSecao}>Descrição</Text>
        <View style={styles.TrabContainer}>
          <View style={styles.caixaTrab}>
            <Text style={styles.compTrab}>{userData.descrição}   </Text>

            
          </View>


          <Text style={styles.TituloSecao}>Outras Informações:</Text>
          <View style={styles.caixaTrab}>
            <Text style={styles.TitTrab}>Trabalho: {userData.trabalho}</Text>
            <Text style={styles.TitTrab}>experiência:</Text>
            <Text style={styles.LocalTrab}> {userData.experiencias}</Text>
            <Text style={styles.TitTrab}>Sobre mim</Text>
            <Text style={styles.LocalTrab}>{userData.sobre}</Text>
          </View>
        </View>

        <Text style={styles.TituloSecao}>Descrição</Text>
          <View style={styles.TrabContainer}>
             <View style={styles.caixaTrab}>
            <Text style={styles.compTrab}>{userData.descrição}</Text>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
}
