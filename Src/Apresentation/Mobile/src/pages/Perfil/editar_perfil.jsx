import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image, Button ,ScrollView} from 'react-native';
import { auth,db,storage } from '../../config/firebaseConfig';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialIcons, Ionicons , Feather} from '@expo/vector-icons';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import styles from './styles2'; 
import styles2 from './styles2';
import Toast from 'react-native-toast-message';


export default function Editar() {
  const navigation = useNavigation();
  const[userData, setUserData] = useState({
     name:'',
     email:'',
     deficiencia:'',
     experiencias:'',
     idade:'',
     descrição:'',
     sobre:'',
     tipo:'',
     trabalho:'',
    imageProfile: '',
    imageUrl: ''
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, 'PCD', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("Documento não encontrado");
      }
    };
    fetchUserData();
  }, []);

 
  const handleUpdate = async () => {
    try{
    const docRef = doc(db, 'PCD', auth.currentUser.uid);

    let updatedData = { ...userData };

    if (newProfileImage) {
      setIsUploading(true);
      const response = await fetch(newProfileImage);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);
      updatedData.imageUrl = imageUrl;
      setIsUploading(false);
    }

    if(newBackgroundImage){
    setIsUploading(true);
    const response = await fetch(newBackgroundImage);
    const blob = await response.blob();
    const storageRef = ref(storage, `background_profile/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, blob);
    const imageProfile = await getDownloadURL(storageRef);
    updatedData.imageProfile = imageProfile;
    setIsUploading(false);
    }
    await updateDoc(docRef, updatedData);
Toast.show({
  type: 'success',
  position: 'bottom',
  text1:'Sucesso',
  text2: 'Atualização realizada',
});
    navigation.navigate('perfil', { reload: true });
  } catch (error) {
    console.error("Erro ao buscar vagas: ", error);
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Erro',
      text2: 'Erro ao adicionar pessoa.',
    });
  }
};

  const handlePickImage = async (setImage) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você precisa permitir o acesso à galeria de fotos.");
      return;
    }

    let result;
    try {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao abrir a galeria de imagens:", error);
    }
  };


    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.container2}>
      <View style={styles.carregando}>
      <Image source={require('../../img/logo.png')} style={styles2.logo} />
      </View>
      </View>

        <View style={styles.container}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.EntradaText}
            value={userData.name}
            onChangeText={(text)=> setUserData({...userData, name:text})}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.EntradaText} 
         value={userData.email}
         onChangeText={(text)=> setUserData({...userData, email: text})}
        />

        <Text style={styles.label}>Deficiencia</Text>
        <TextInput style={styles.EntradaText}
        value={userData.deficiencia}
        onChangeText={(text)=> setUserData({...userData, deficiencia: text})}    
        />

        <Text style={styles.label}>Experiências</Text>
        <TextInput style={styles.EntradaText}
        value={userData.experiencias}
        multiline={true}
        onChangeText={(text)=> setUserData({...userData, experiencias: text})}    
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.EntradaText}
        value={userData.descrição}
        multiline={true}
        onChangeText={(text)=> setUserData({...userData, descrição: text})}    
        />

        <Text style={styles.label}>Sobre</Text>
        <TextInput style={styles.EntradaText}
        value={userData.sobre}
        multiline={true}
        onChangeText={(text)=> setUserData({...userData, sobre: text})}    
        />

        <Text style={styles.label}>Data de aniversário</Text>
        <TextInput style={styles.EntradaText}
        value={userData.idade}
        onChangeText={(text)=> setUserData({...userData, idade:text})}
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput style={styles.EntradaText}
        value={userData.tipo}
        onChangeText={(text)=> setUserData({...userData, tipo: text})}    
        />

        <Text style={styles.label}>Trabalho</Text>
        <TextInput style={styles.EntradaText}
        value={userData.trabalho}
        onChangeText={(text)=> setUserData({...userData, trabalho: text})}    
        />

       <Text style={styles.label}>Imagem de Perfil</Text>
        <View style={styles2.imageContainer}>
          <TouchableOpacity onPress={() => handlePickImage(setNewProfileImage)} style={styles2.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={styles2.uploadIcon} />
          </TouchableOpacity>
          {newProfileImage && <Image source={{ uri: newProfileImage }} style={styles2.Imagem} />}
        </View>

        <Text style={styles.label}>Imagem de Fundo</Text>
        <View style={styles2.imageContainer}>
          <TouchableOpacity onPress={() => handlePickImage(setNewBackgroundImage)} style={styles2.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={styles2.uploadIcon} />
          </TouchableOpacity>
          {newBackgroundImage && <Image source={{ uri: newBackgroundImage }} style={styles2.Imagem} />}
        </View>


        <TouchableOpacity onPress={handleUpdate} style={styles2.button} disabled={isUploading}>
          <Text style={styles2.buttonText}>Salvar</Text>
        </TouchableOpacity>
        {isUploading && <Text>Carregando...</Text>}
      </View>
    </ScrollView>
  );
}
