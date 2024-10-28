// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay} from 'react-native-reanimated';
import { FontAwesome, Ionicons , Feather} from '@expo/vector-icons';
import {doc, getDoc} from 'firebase/firestore';
import styles from './style';
import load from '../load/load';
import Alert from '../Alert/Alert';
import { ImageBackground } from 'react-native';
import Modal from 'react-native-modal'; 


export default function Home() {
  const [userData, setUserData] = useState(null)
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const avatarOpacity = useSharedValue(0);
  const slideIn = useSharedValue(-300);

  const handleSignOut = async() => {
    try{
      await auth.signOut();
      navigation.navigate("Login");
    }catch (error) {
      console.error('Erro ao deslogar: ', error);
  }
  setModalVisible(false); 
};

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

const handleConfirmSignOut = () => {
  toggleModal();  
};

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'PCD', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        avatarOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
        slideIn.value = withTiming(0, { duration: 500 });
      } else {
        console.log('Documento não encontrado');
        await auth.signOut(); 
        navigation.replace('Login'); 
      }
    };
    fetchUserData();
  }, []);

  const handlePerfil = () => {
    navigation.navigate("perfil");
  };
  const handleEmpresa = () => {
    navigation.navigate("empresa");
  };
  const handleVaga = () => {
    navigation.navigate("vaga");
  };
 
  const handleProcesso = () => {
    navigation.navigate("processo");
  };

  const animatedAvatarStyle = useAnimatedStyle(() => {
    return {
      opacity: avatarOpacity.value,
    };
  });

  const animatedSlideStyle = useAnimatedStyle(() => {
  return {
    transform: [{ translateX: slideIn.value }],
  };
});


  if (!userData) {
    return (
      <View style={load.container2}>
      <View style={load.carregando}>
        <Image source={require('../../img/logo.png')}
        resizeMode='contain' style={load.logo} />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={load.text}>Loading...</Text>
      </View>
    </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
     <Animated.View style={[styles.container, animatedSlideStyle]}>
     <ImageBackground
      source={require('../../img/background2.jpg')} 
      style={styles.imageBackground}
      imageStyle={{ opacity: 0.1 }} 
    >
          <Animated.Image
          source={{
            uri: userData.imageUrl || 'https://via.placeholder.com/150',
          }}
          style={[styles.perfilImage, animatedAvatarStyle]}
        />
       
        <Text style={styles.bemvindoText}>Bem vindo, {userData.name}</Text>
        <Text style={styles.legenda}>Nosso {userData.trabalho}</Text>
        <Text style={styles.OqueText}>O que temos para hoje?</Text>
        
        <View style={styles.estatisticasContainer}>
          <TouchableOpacity style={styles.caixaopcoes1} onPress={(handleVaga)}>
          <Text style={styles.tituloBotao}>Vagas</Text>
          <Text style={styles.descricaoBotao}>A cada momento surgem novas vagas.</Text>
            <Image
              source={require('../../img/botao.png')}
              style={styles.imagemBotao} 
            
              />
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoes2} onPress={(handleEmpresa)}>
          <Text style={styles.tituloBotao2}>Empresa</Text>
          <Text style={styles.descricaoBotao2}>Esta ciente sobre as empresas disponíveis no sistema.</Text>
          <Image
              source={require('../../img/botao2.png')}
              style={styles.imagemBotao}
              resizeMode='contain' />
          </TouchableOpacity>   
        </View>

        <View style={styles.opçoesContainer}>
        <TouchableOpacity style={styles.caixaopcoesAzul} onPress={(handleProcesso)}>
            <Feather name="loader" size={24} color="#fff" />
            <Text style={styles.opcoesText4}>Candidaturas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.caixaopcoesCinza} onPress={handlePerfil}>
            <FontAwesome name="user" size={24} color="#000" />
            <Text style={styles.opcoesText1}>Meu perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.caixaopcoesAzul} onPress={handleConfirmSignOut}>
            <FontAwesome name="sign-out" size={24} color="#fff" />
            <Text style={styles.opcoesText2}>Sair</Text>
          </TouchableOpacity>

<Modal isVisible={isModalVisible} onBackButtonPress={toggleModal} >
  <View style={Alert.modalContent}>
    <Text style={Alert.modalTitle}>Confirmação de Logout</Text>
    <Text style={Alert.modalText}>Tem certeza que deseja sair?</Text>
    <View style={Alert.buttonContainer}>
    <TouchableOpacity style={Alert.cancelButton} onPress={toggleModal}>
       <Text style={Alert.buttonText}>Cancelar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={Alert.confirmButton} onPress={handleSignOut}>
       <Text style={Alert.buttonText}>Confirmar</Text>
    </TouchableOpacity>
    </View>
  </View>
</Modal>

        </View>
        </ImageBackground>
        </Animated.View>
    </ScrollView>
  );
}

