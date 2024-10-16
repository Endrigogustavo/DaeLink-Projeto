import React, { useEffect, useState ,useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image, Button ,ScrollView,Animated} from 'react-native';
import { auth,db,storage } from '../../config/firebaseConfig';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialIcons, Ionicons , Feather} from '@expo/vector-icons';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import styles from './styles2'; 
import styles2 from './styles2';
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';
import {useForm} from 'react-hook-form'

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
  
  const H_MAX_HEGIHT = 150;
const H_MIN_HEGIHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEGIHT- H_MIN_HEGIHT

const scrollOffsetY = useRef(new Animated.Value(0)).current;

const headerScrollHeight = scrollOffsetY.interpolate({
  inputRange: [0, H_SCROLL_DISTANCE],
  outputRange:[H_MAX_HEGIHT, H_MIN_HEGIHT],
  extrapolate: 'clamp'
})

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
      <ScrollView  onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],{ useNativeDriver: false })} scrollEventThrottle={16} contentContainerStyle={styles.scrollContainer}
>
         <Animated.View style={[styles.headerTopBar, {height: headerScrollHeight} ]}>
            <Text style={styles.headerTopBarText}>Página de Edição de perfil</Text>
            <View style={styles.row}>
            <Text style={styles.headerLeftBarText}>Complete os dados abaixo para a realização de sua edição de perfil</Text>
            <Video 
                    source={require('../../img/Company.mp4')}
                    style={styles.video}
                    resizeMode='cover'
                    isLooping
                    shouldPlay
                />
          </View>
          </Animated.View>

        <View style={styles.container}>

        <Text style={styles.label}>Nome Completo</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
             <Ionicons name="person-circle-outline" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
            value={userData.name}
            onChangeText={(text)=> setUserData({...userData, name:text})}
        />
       </View>

       <Text style={styles.label}>Email</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <MaterialIcons name="email" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText} 
         value={userData.email}
         onChangeText={(text)=> setUserData({...userData, email: text})}
        />
</View>

       <Text style={styles.label}>Deficiencia</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <FontAwesome name="wheelchair" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.deficiencia}
        onChangeText={(text)=> setUserData({...userData, deficiencia: text})}    
        />
        </View>

        <Text style={styles.label}>Experiências</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <Feather name="briefcase" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.experiencias}
        multiline={true}
        onChangeText={(text)=> setUserData({...userData, experiencias: text})}    
        />
        </View>

         <Text style={styles.label}>Descrição</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.descrição}
        multiline={true}
        onChangeText={(text)=> setUserData({...userData, descrição: text})}    
        />
</View>

       <Text style={styles.label}>Sobre</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
             <Ionicons name="person-circle-outline" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.sobre}
        multiline={true}
        onChangeText={(text)=> setUserData({...userData, sobre: text})}    
        />
</View>

        <Text style={styles.label}>Idade</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <FontAwesome name="calendar" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.idade}
        onChangeText={(text)=> setUserData({...userData, idade:text})}
        />
</View>
         <Text style={styles.label}>tipo</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <MaterialIcons name="category" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.tipo}
        onChangeText={(text)=> setUserData({...userData, tipo: text})}    
        />
</View>
         <Text style={styles.label}>Trabalho</Text>     
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
          <Ionicons name="business-outline" size={24} color="white" />
          </View>
        <TextInput style={styles.EntradaText}
        value={userData.trabalho}
        onChangeText={(text)=> setUserData({...userData, trabalho: text})}    
        />
</View>

       <Text style={styles.label}>Imagem de Perfil</Text>
        <View style={styles2.imageContainer}>
          <TouchableOpacity onPress={() => handlePickImage(setNewProfileImage)} style={styles2.imageButton}>
        {/* <Image source={{ uri: userData.imageUrl }} style={styles.PerfilImage} />*/}
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
