import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { doc, collection, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'; 
import { Ionicons } from '@expo/vector-icons'; 
import style from "./Editar-Doc/styleViDoc";



export default function Editar_Documento(){
const navigate = useNavigation();
 const [ userData, setUserData ] = useState({
    name:'',
    endereco:'',
    telefone:'',
    email:'',
    idade:'',
    objetivo:'',
    experiencias1:'', 
    experiencias2: '',
    experiencias3: '',
    formacao_academica1: '',
    formacao_academica2: '',
    formacao_academica3: '',
    formacao_complementar1: '',
    formacao_complementar2: '',
    formacao_complementar3: '',
    qualificacao1:'',
    qualificacao2: '',
    qualificacao3: '',
    qualificacao4: '',
    qualificacao5: '',
    idioma1: '',
    idioma2: '',
    informatica: '',
    url: '',
   
 });  
 const [newImage, setNewImage] = useState(null);
 const [isUploading, setIsUploading] = useState(false);

 const handlePickImage = async () => {
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
            setNewImage(result.assets[0].uri); 
        }
    } catch (error) {
        console.error("Erro ao abrir a galeria de imagens:", error);
    }
};

    return(    
            <ScrollView contentContainerStyle={style.scrollContainer}>
            <View style={style.container}>
                <View style={style.container2}>
                    <View style={style.carregando}>
                        <Image source={require('../../img/logo.png')} style={style.logo} />
                    </View>
                    </View>

    
                    <Text style={style.label}>Nome</Text>
                    <TextInput
                        value={userData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Email</Text>
                    <TextInput
                        value={userData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Telefone</Text>
                    <TextInput
                        value={userData.telefone}
                        onChangeText={(text) => handleInputChange('telefone', text)}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Endereço</Text>
                    <TextInput
                        value={userData.endereco}
                        onChangeText={(text) => handleInputChange('endereco', text)}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Idade</Text>
                    <TextInput
                        value={userData.idade}
                        onChangeText={(text) => handleInputChange('idade', text)}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Objetivo Profissional</Text>
                    <TextInput
                        value={userData.objetivo}
                        onChangeText={(text) => handleInputChange('objetivo', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Experiências 1</Text>
                    <TextInput
                        value={userData.experiencias1}
                        onChangeText={(text) => handleInputChange('experiencias1', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Experiências 2</Text>
                    <TextInput
                        value={userData.experiencias2}
                        onChangeText={(text) => handleInputChange('experiencias2', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Experiências 3</Text>
                    <TextInput
                        value={userData.experiencias3}
                        onChangeText={(text) => handleInputChange('experiencias3', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Formação Acadêmica 1</Text>
                    <TextInput
                        value={userData.formacao_academica1}
                        onChangeText={(text) => handleInputChange('formacao_academica1', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Formação Acadêmica 2</Text>
                    <TextInput
                        value={userData.formacao_academica2}
                        onChangeText={(text) => handleInputChange('formacao_academica2', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Formação Acadêmica 3</Text>
                    <TextInput
                        value={userData.formacao_academica3}
                        onChangeText={(text) => handleInputChange('formacao_academica3', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Formação Complementar 1</Text>
                    <TextInput
                        value={userData.formacao_complementar1}
                        onChangeText={(text) => handleInputChange('formacao_complementar1', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Formação Complementar 2</Text>
                    <TextInput
                        value={userData.formacao_complementar2}
                        onChangeText={(text) => handleInputChange('formacao_complementar2', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Formação Complementar 3</Text>
                    <TextInput
                        value={userData.formacao_complementar3}
                        onChangeText={(text) => handleInputChange('formacao_complementar3', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Qualificação 1</Text>
                    <TextInput
                        value={userData.qualificacao1}
                        onChangeText={(text) => handleInputChange('qualificacao1', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Qualificação 2</Text>
                    <TextInput
                        value={userData.qualificacao2}
                        onChangeText={(text) => handleInputChange('qualificacao2', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Qualificação 3</Text>
                    <TextInput
                        value={userData.qualificacao3}
                        onChangeText={(text) => handleInputChange('qualificacao3', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Qualificação 4</Text>
                    <TextInput
                        value={userData.qualificacao4}
                        onChangeText={(text) => handleInputChange('qualificacao4', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Qualificação 5</Text>
                    <TextInput
                        value={userData.qualificacao5}
                        onChangeText={(text) => handleInputChange('qualificacao5', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Idioma 1</Text>
                    <TextInput
                        value={userData.idioma1}
                        onChangeText={(text) => handleInputChange('idioma1', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Idioma 2</Text>
                    <TextInput
                        value={userData.idioma2}
                        onChangeText={(text) => handleInputChange('idioma2', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <Text style={style.label}>Informática</Text>
                    <TextInput
                        value={userData.informatica}
                        onChangeText={(text) => handleInputChange('informatica', text)}
                        multiline={true}
                        style={style.EntradaText}
                    />
    
                    <TouchableOpacity onPress={handlePickImage} style={style.button}>
                        <Text style={style.buttonText}>Documento</Text>
                    </TouchableOpacity>
                    
                    {newImage && (
                        <Image source={{ uri: newImage }} style={style.previewImage} />
                    )}
    
                    <Button title="Save" onPress={() => { /* save logic here */ }} />
                </View>
            
            </ScrollView>
        );
    }