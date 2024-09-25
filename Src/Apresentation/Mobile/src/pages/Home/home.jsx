// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import styles from './style';
import load from '../load/load';


export default function Home() {
  const [userData, setUserData] = useState(null)
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    }).catch(error => alert(error.message));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'PCD', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('Não encontrado documento');
      }
    };
    fetchUserData();
  }, []);

  const handlePerfil = () => {
    navigation.navigate("perfil");
  };
  const handleConfig = () => {
    navigation.navigate("configuração");
  };
  const handleVaga = () => {
    navigation.navigate("vaga");
  };
  const handleDocumento = () => {
    navigation.navigate("documento");
  };
  const handleProcesso = () => {
    navigation.navigate("processo");
  };

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
      <View style={styles.container}>
        <Image
          source={{ uri: userData.imageUrl || 'https://via.placeholder.com/150' }}
          style={styles.perfilImage}
        />
        <Text style={styles.bemvindoText}>Bem vindo, {auth.currentUser.email}</Text>
        <Text style={styles.legenda}>Seu Perfil</Text>

        <View style={styles.estatisticasContainer}>
          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleVaga)}>
            <MaterialIcons name="work" size={24} color="#fff" />
            <Text style={styles.opcoesText}>Vagas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleDocumento)}>
            <Ionicons name="documents" size={24} color="#fff" />
            <Text style={styles.opcoesText}>Documento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleProcesso)}>
            <Feather name="loader" size={24} color="#fff" />
            <Text style={styles.opcoesText}>Processo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.opçoesContainer}>
          <TouchableOpacity style={styles.caixaopcoes} onPress={handlePerfil}>
            <FontAwesome name="user" size={24} color="#fff" />
            <Text style={styles.opcoesText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={(handleConfig)}>
            <FontAwesome name="cogs" size={24} color="#fff" />
            <Text style={styles.opcoesText}>Configuração</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes} onPress={handleSignOut}>
            <FontAwesome name="sign-out" size={24} color="#fff" />
            <Text style={styles.opcoesText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

