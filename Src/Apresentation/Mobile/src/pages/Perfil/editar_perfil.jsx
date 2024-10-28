import React, { useEffect, useState ,useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image, Button ,ScrollView,Animated} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';
import { auth,db,storage } from '../../config/firebaseConfig';
import {doc, getDoc, updateDoc, query, where, getDocs, deleteDoc} from 'firebase/firestore';
import { getAuth, updateEmail ,sendPasswordResetEmail} from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialIcons, Ionicons , Feather, AntDesign} from '@expo/vector-icons';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import styles from './editar_Perfil'; 
import Toast from 'react-native-toast-message';
import Alert from '../Alert/Alert';

import { Video } from 'expo-av';
import style from './style';

export default function Editar() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const H_MAX_HEGIHT = 150;
  const H_MIN_HEGIHT = 50;
  const H_SCROLL_DISTANCE = H_MAX_HEGIHT- H_MIN_HEGIHT
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
     const headerScrollHeight = scrollOffsetY.interpolate({
       inputRange: [0, H_SCROLL_DISTANCE],outputRange:[H_MAX_HEGIHT, H_MIN_HEGIHT],extrapolate: 'clamp'
     });


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

 const toggleExpand = () =>{
  setIsExpanded(!isExpanded);
 };

 const PassReset = () => {
  const auth = getAuth();
    sendPasswordResetEmail(auth, userData.email)
     .then(()=>{
       Toast.show({
         type: 'ResetSenha',
          text1: 'Email',
          text2: 'Email para a alteração de senha foi enviado.',
          position: 'top',
          props: { icon: '✅'}
      });
    })    
 };

 const DeletPerf = async (id)=>{
   try{
    const auth =getAuth();
    const user = auth.currentUser();
    const UserInfo = doc(db, "PCD", id);
    await deleteDoc(UserInfo);
    localStorage.removeItem('userId');
    navigation.navigate('Login')
    Toast.show({
      type: 'ResetSenha',
       text1: 'Exclusão',
       text2: 'Exclusão de sua conta com sucesso',
       position: 'top',
       props: { icon: '✅'}
   });
    if (error.code === 'auth/requires-recent-login') {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Erro',
      text2: 'Desculpe para realizar a exclusão deve-se sair de sua conta e entrar novamente.',
    });
  }
      }catch{
        Toast.show({
          type: 'Login',
          position: 'bottom',
          text1: 'Erro',
          text2: 'Desculpe não foi possivel excluir sua conta tente novamente.',
          position: 'top',
          props: { icon: '❗'}
        });
     setModalVisible(false)
  }
}

   const toggleModal = () => {
    setModalVisible(!isModalVisible);
   };

   const handleConfirmDelect = () => {
     toggleModal();  
   };

  const handleUpdate = async () => {
    try{
        const docRef = doc(db, 'PCD', auth.currentUser.uid);
        await updateEmail(user, userData.email )   
          let updatedData = { ...userData };

                  if(newProfileImage) {
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

         }catch (error) {
                 Toast.show({
                   type: 'error',
                   position: 'bottom',
                   text1: 'Erro',
                   text2: 'Erro ao adicionar pessoa.',
                 });
                 if (error.code === 'auth/email-already-in-use') {
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro',
                    text2: 'Este e-mail já esta em uso',
                  });
                } else if (error.code === 'auth/invalid-email') {
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro',
                    text2: 'O e-mail é invalido',
                  });
                }else if (error.code === 'auth/requires-recent-login') {
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro',
                    text2: 'Desculpe para realizar alterção do email deve-se sair de sua conta e entrar novamente.',
                  });
                 }
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
      <ScrollView  onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],{     useNativeDriver: false })} scrollEventThrottle={16} contentContainerStyle={styles.scrollContainer}>
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
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handlePickImage(setNewProfileImage)} style={styles.imageButton}>
        {/* <Image source={{ uri: userData.imageUrl }} style={styles.PerfilImage} />*/}
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={styles.uploadIcon} />
          </TouchableOpacity>
          {newProfileImage && <Image source={{ uri: newProfileImage }} style={styles.Imagem} />}
        </View>

        <Text style={styles.label}>Imagem de Fundo</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handlePickImage(setNewBackgroundImage)} style={styles.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={styles.uploadIcon} />
          </TouchableOpacity>
          {newBackgroundImage && <Image source={{ uri: newBackgroundImage }} style={styles.Imagem} />}
        </View>
             <View style={styles.Containerbotao}>
                  <TouchableOpacity onPress={toggleExpand} style={styles.ExpancaoButton}>
                  <AntDesign name={isExpanded?  "pluscircle" : "pluscircleo"} size={30}  style={styles.plusIcon}></AntDesign>
                  </TouchableOpacity>
             </View>

      {isExpanded &&(
        <Animated.View style={styles.expandedContainer}>
        <View style={styles.colunmButton}>
             <TouchableOpacity onPress={PassReset} style={styles.actionButton} disabled={isUploading}>
             <AntDesign name="edit" size={30} color="#000" style={styles.uploadIcon} />
             <Text style={styles.buttonText}>Trocar Senha</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={handleUpdate} style={styles.actionButton2} disabled={isUploading}>
             <AntDesign name="save" size={30} color="#000" style={styles.uploadIcon} />
             <Text style={styles.buttonText}>Salva alteração</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={handleConfirmDelect} style={styles.actionButton3} disabled={isUploading}>
             <AntDesign name="delete" size={30} color="#000" style={styles.uploadIcon} />
             <Text style={styles.buttonText}>Deletar Conta</Text>
             </TouchableOpacity>
             <Modal isVisible={isModalVisible} onBackButtonPress={toggleModal}>
                 <View style={Alert.modalContent}>
                    <Text style={Alert.modalTitle}>Confirmação de Exclusão</Text>
                    <Text style={Alert.modalText}>Tem certeza que deseja excluir?</Text>
                    <View style={Alert.buttonContainer}>
                    <TouchableOpacity style={Alert.cancelButton} onPress={toggleModal}>
                       <Text style={Alert.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                        <TouchableOpacity onPress={DeletPerf} style={Alert.confirmButton} disabled={isUploading}>
                          <Text style={Alert.buttonText}>Deletar Perfil</Text>
                        </TouchableOpacity>
                     </View>
                   </View>
                </Modal>
        </View>
       </Animated.View>
      )}
    </View>
  </ScrollView>
  );
}
