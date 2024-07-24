import React, {useState , useCallback, useEffect}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation, useFocusEffect , useRoute} from '@react-navigation/native';
import {doc, collection, getDoc } from 'firebase/firestore';
import styles from "./styleEn";
import style from './style';
import Vagas from './vagas';


export default function Editar_Documento(){

        const [vagas, setVagas] = useState([]);
        
        
    return(    
        <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.container2}>
      <View style={styles.carregando}>
      <Image source={require('../../img/logo.png')} style={styles.logo} />
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

         <Text style={style.label}>Imagem de Perfil</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={handlePickImage} style={style.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {newImage && <Image source={{ uri: newImage }} style={style.Imagem} />}
        </View>

        <Button title="Enviar" onPress={handleSubmit} style={{ marginTop: 20 }} />

        </View>


        
        </ScrollView>
    )
}