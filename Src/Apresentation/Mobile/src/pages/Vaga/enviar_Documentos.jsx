import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image, ScrollView,Button} from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/core';
import { db,storage,auth } from '../../config/firebaseConfig';
import {doc, getDoc,} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialIcons, Ionicons , Feather} from '@expo/vector-icons';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import style from './style';


  export default function Documentos() {
    const navigation = useNavigation();
    const route = useRoute();
    const { vagaId, userId } = route.params;
  
    const [newImage, setNewImage] = useState(null);
    const [vagas, setVagas] = useState([]);
    const [userUid, setUserUid] = useState(userId);
  
    const [name, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdades] = useState("");
    const [objetivo, setObjetivo] = useState("");
  
    const [experiencia1, setExperiencia1] = useState("");
    const [experiencia2, setExperiencia2] = useState("");
    const [experiencia3, setExperiencia3] = useState("");
  
    const [formacao1a, setFormacao1a] = useState("");
    const [formacao2a, setFormacao2a] = useState("");
    const [formacao3a, setFormacao3a] = useState("");
  
    const [formacao1c, setFormacao1c] = useState("");
    const [formacao2c, setFormacao2c] = useState("");
    const [formacao3c, setFormacao3c] = useState("");
  
    const [qualificacao1, setQualificacao1] = useState("");
    const [qualificacao2, setQualificacao2] = useState("");
    const [qualificacao3, setQualificacao3] = useState("");
    const [qualificacao4, setQualificacao4] = useState("");
    const [qualificacao5, setQualificacao5] = useState("");
  
    const [idiomas1, setIdiomas1] = useState("");
    const [idiomas2, setIdiomas2] = useState("");
  
    const [informatica, setInformatica] = useState("");
  
    const [documento, setDocumento] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, 'PCD', userId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.name);
          setEndereco(data.endereco);
          setTelefone(data.telefone);
          setEmail(data.email);
          setIdades(data.idade);
         
        } else {
          console.log('Documento não encontrado');
        }
      };
  
      fetchUserData();
    }, []);
  
    const handlePickImage= async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
      });
  
      if(!result.canceled){
        setNewImage(result.assets[0].uri)
      }
     };

     const handleSubmit = async () => {
      try {
        const userId = auth.currentUser.uid;
        const storageRef = ref(storage, `documentos/${documento.name}`);
        await uploadBytes(storageRef, documento);
  
        const downloadURL = await getDownloadURL(storageRef);
  
        const candidatosRef = collection(db, "Vagas", vagaId, "candidatos");
  
        const q = query(candidatosRef, where("userId", "==", userId));
        const querySnapshot = await getDoc(q);
  
        if (!querySnapshot.empty) {
          const candidatoDoc = querySnapshot.docs[0];
          const candidatoId = candidatoDoc.id;
  
          const candidatoDocRef = doc(db, "Vagas",vagaId, "candidatos", candidatoId);
  
          const documentosRef = collection(candidatoDocRef, "documentos");
  
          await addDoc(documentosRef, {
            nome,
            endereco,
            telefone,
            email,
            idade,
            objetivo,
            experiencias1: experiencia1,
            experiencias2: experiencia2,
            experiencias3: experiencia3,
            formacao_academica1: formacao1a,
            formacao_academica2: formacao2a,
            formacao_academica3: formacao3a,
            formacao_complementar1: formacao1c,
            formacao_complementar2: formacao2c,
            formacao_complementar3: formacao3c,
            qualificacao1: qualificacao1,
            qualificacao2: qualificacao2,
            qualificacao3: qualificacao3,
            qualificacao4: qualificacao4,
            qualificacao5: qualificacao5,
            idioma1: idiomas1,
            idioma2: idiomas2,
            informatica: informatica,
            url: downloadURL,
            userId: userId  
          });
  
          alert("Documento adicionado com sucesso!");
          setDocumento(null);
          navigation.navigate("Home");
        } else {
          console.error("Candidato não encontrado.");
          alert("Erro ao adicionar documento: candidato não encontrado.");
        }
      } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        alert("Erro ao adicionar documento.");
      }
    };

    return (
        <ScrollView contentContainerStyle={style.scrollContainer}>
        <View style={style.container}>
        <View style={style.container2}>
                    <View style={style.carregando}>
                        <Image source={require('../../img/logo.png')} style={style.logo} />
                    </View>
                    </View>
        <Text style={style.label}>Código Vaga</Text>
        <TextInput
        value={vagaId}
        onChange={setNome}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Código do Usuário</Text>
        <TextInput
        value={userUid}
        onChange={setNome}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Nome</Text>
        <TextInput
        value={name}
        onChange={setNome}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Email</Text>
        <TextInput 
        value={email}
        onChange={setEmail}
        style={style.EntradaText}></TextInput>
       
        <Text style={style.label}>Telefone</Text>
        <TextInput
        value={telefone}
        onChange={setTelefone}
         style={style.EntradaText}></TextInput>
       
        <Text style={style.label}>Endereço</Text>
        <TextInput
        value={endereco}
        onChange={setEndereco}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>idade</Text>
        <TextInput
        value={idade}
        onChange={setIdades}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Objetivo Profissional</Text>
        <TextInput
        value={objetivo}
        onChange={setObjetivo}
         multiline={true}
         style={style.EntradaText}></TextInput>
      
        <Text style={style.label}>Experiências 1</Text>
        <TextInput 
        value={experiencia1}
        onChange={setExperiencia1}
         multiline={true}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Experiências 2</Text>
        <TextInput 
        value={experiencia2}
        onChange={setExperiencia2}
         multiline={true}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Experiências 3</Text>
        <TextInput
        value={experiencia3}
        onChange={setExperiencia3}
        multiline={true}
        style={style.EntradaText}></TextInput>

        <Text style={style.label}>Formação academica 1</Text>
        <TextInput 
        value={formacao1a}
        onChange={setFormacao1a}
         multiline={true}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Formação academica 2</Text>
        <TextInput 
        value={formacao2a}
        onChange={setFormacao2a}
         multiline={true}
         style={style.EntradaText}></TextInput>

        <Text style={style.label}>Formação academica 3</Text>
        <TextInput 
        value={formacao3a}
        onChange={setFormacao3a}
        multiline={true}
        style={style.EntradaText}/>

        <Text style={style.label}> Formação Complementar 1</Text>
        <TextInput
        value={formacao1c}
        onChange={setFormacao1c}
        multiline={true}
         style={style.EntradaText}/>

         <Text style={style.label}> Formação Complementar 2</Text>
         <TextInput
         multiline={true}
         value={formacao2c}
         onChange={setFormacao2c}
          style={style.EntradaText}/>

         <Text style={style.label}> Formação Complementar 3</Text>
         <TextInput
         value={formacao3c}
         onChange={setFormacao3c}
         multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Qualificação 1</Text>
         <TextInput
         value={qualificacao1}
         onChange={setQualificacao1}
         multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Qualificação 2</Text>
         <TextInput
          value={qualificacao2}
          onChange={setQualificacao2}
         multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Qualificação 3</Text>
         <TextInput
          value={qualificacao3}
          onChange={setQualificacao3}
          multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Qualificação 4</Text>
         <TextInput 
          value={qualificacao4}
          onChange={setQualificacao4}
          multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Qualificação 5</Text>
         <TextInput
          value={qualificacao5}
          onChange={setQualificacao5}
          multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Idioma 1</Text>
         <TextInput
          value={idiomas1}
          onChange={setIdiomas1}
          multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Idioma 2</Text>
         <TextInput 
         value={idiomas2}
         onChange={setIdiomas2}
         multiline={true}
         style={style.EntradaText}/>

         <Text style={style.label}>Informatica</Text>
         <TextInput
          value={informatica}
          onChange={setInformatica}
         multiline={true}
          style={style.EntradaText}/>

         <Text style={style.label}>Imagem do documento</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={handlePickImage} style={style.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {newImage && <Image source={{ uri: newImage }} style={style.Imagem} />}
        </View>

        <TouchableOpacity title="Enviar" onPress={handleSubmit} style={style.button}>
        <Text style={style.Text}>Enviar</Text>
        </TouchableOpacity>

        </View>

      

        </ScrollView>
    );
}
