import React, { useCallback, useState } from 'react';
import { View, Text ,Image,ScrollView,ActivityIndicator} from 'react-native';
import { auth,db } from '../../config/firebaseConfig';
import {doc, getDoc} from 'firebase/firestore';
import { useNavigation,  useRoute, useFocusEffect } from '@react-navigation/core';
import styles from './stylePerfEm'
import load from '../load/load';

export default function PerfilEmpresa(){
 const [userData, setUserData] = useState(null);
 const navigation = useNavigation();
 const route = useRoute();
const { empresaId } = route.params;

const fetchUserData = useCallback(async() =>{
    const docRef = doc(db, 'Empresa', empresaId );
    const userSnap = await getDoc(docRef);
    if (userSnap.exists()){
        setUserData(userSnap.data());
    }else{
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
            <Image resizeMode='contain'  source={require('../../img/logo.png')} style={load.logo} />
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={load.text}>Carregando...</Text>
            </View>
          </View>
        );
      }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
  
        <View style={styles.header}>
            <Image source={{uri:userData.imageProfile}}
            style={styles.headerBackground}/>

            <Image source={{uri: userData.imageUrl || 'https://via.placeholder.com/150' }} 
            style={styles.perfilImage}/>

            <Text style={styles.nome}>Empresa</Text>
            <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.container}>
        <Text style={styles.TituloSecao}>Informações Empresa</Text>
        <View style={styles.infocaixa}>
          <Text style={styles.infoText}>Nome Completo: {userData.name}</Text>
          <Text style={styles.infoText}>Email: {userData.email}</Text>
          <Text style={styles.infoText}>Idade: {userData.endereco}</Text>
        </View>

        <Text style={styles.TituloSecao}>Descrição</Text>
        <View style={styles.TrabContainer}>
          <View style={styles.caixaTrab}>
            <Text style={styles.TitTrab}>Tipo de Empresa: {userData.area}</Text>
            <Text style={styles.compTrab}>Descrição: {userData.sobre}</Text>
          </View>
          </View>
          </View>

        </ScrollView>
    )


}
