import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity,  Image, ScrollView, Animated } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';
import { db, storage, auth } from '../../config/firebaseConfig';
import { doc, getDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, AntDesign,Entypo,Fontisto,FontAwesome5} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from "expo-document-picker"

import * as yup from 'yup';
import { MaskedTextInput } from 'react-native-mask-text';

import style from './style';

//Tratamento com yup
const schema = yup.object({
  name: yup.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .required("Nome é Obrigatório"),
  
  endereco: yup.string()
    .min(6, "O endereço deve conter pelo menos 6 caracteres")
    .required("Endereço obrigatório"),
  
  idade: yup.string()
    .required('Data de Nascimento é obrigatória')
    .matches(
      /^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4})$/,
      "Data deve estar no formato DD/MM/AAAA"
    ),
  
  objetivo: yup.string()
    .min(10, "O seu objetivo deve conter no mínimo 10 caracteres"),
  
  experiencia1: yup.string()
    .min(10, "A sua experiência deve conter no mínimo 10 caracteres")
    .required("Experiência Obrigatória"),
  
  informatica: yup.string()
    .required("Informática é obrigatória"),
});

export default function Documentos() {

  const navigation = useNavigation();
  const route = useRoute();

  const { vagaId, userId } = route.params;
  const [vagas, setVagas] = useState([]);
  const [userUid, setUserUid] = useState(userId);

  const [name, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState('');
  const [idade, setIdades] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [experiencia1, setExperiencia1] = useState("");
  const [idiomas1, setIdiomas1] = useState('');
  const [informatica, setInformatica] = useState("");

  const [fileNames, setFileNames] = useState(["", "", ""]); 
  const [NewLaudo, setLaudo] = useState(null);
  const [Newdocumento, setDocumento] = useState(null);
  const [Newdocumento2, setDocumento2] = useState(null);
  const [errors, setErrors] = useState({});

  console.log(email)
// Efeito do Header
    const H_MAX_HEGIHT = 150;
    const H_MIN_HEGIHT = 50;
    const H_SCROLL_DISTANCE = H_MAX_HEGIHT - H_MIN_HEGIHT
    
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const headerScrollHeight = scrollOffsetY.interpolate({
      inputRange: [0, H_SCROLL_DISTANCE],
      outputRange:[H_MAX_HEGIHT, H_MIN_HEGIHT],
      extrapolate: 'clamp'
    });

//Puxando dados do banco de dados
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser.uid;
      if (userId) {
      const docRef = doc(db, 'PCD', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNome(data.name);
        setEndereco(data.endereco);
        setTelefone(data.telefone);
        setEmail(data.email);
        setIdades(data.idade);
        console.log("Email carregado do banco:", data.email);
      } else {
        console.log('Documento não encontrado');
      }
    }
      else {
        console.error('Usuário não autenticado.');
      }
    };

    fetchUserData();
  }, []);


  //funções de enviar imagem
  const PickerDocument = async () =>{
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true, 
     })
     if(result.assets && result.assets[0].name &&result.assets[0].uri){
      //console.log(result.assets[0].name)
      //console.log(result.assets[0].uri)
      setFileNames(result.assets[0].name)
      setLaudo(result.assets[0].uri)
     }
  };


  const PickerDocument2 = async (setFile) =>  {
   let result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    copyToCacheDirectory: true, 
   })
   if(result.assets && result.assets[0].name &&result.assets[0].uri){
    //console.log(result.assets[0].name)
    //console.log(result.assets[0].uri)
    setFileNames(result.assets[0].name)
    setLaudo(result.assets[0].uri)
   }
  };
   

  const handlePickFile3 = async (setFile) => {
    const permissionResult = await ImagePicker.launchImageLibraryAsync();
    if (permissionResult.granted === false){
      alert("Você precisa permitir o acesso à galeria de fotos.");
      return;
    }
    let result;
    try{
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setFile(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao abrir a galeria de imagens:", error);
    }
  };

  //Função de enviar dados
   const handleSubmit = async () => {
   try {
      await schema.validate({
         name, email, telefone, endereco, idade, objetivo,experiencia1,informatica,},
     { abortEarly: false } // Isso garante que todos os erros sejam capturados de uma vez
        );
      } catch (error) {
            if ("") {
       
        }};

    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("Usuário não autenticado.");
      alert("Você precisa estar autenticado para enviar documentos.");
      return;
    }
    try{
      if (!NewLaudo && !Newdocumento && !Newdocumento2) {
        console.log("Por favor, selecione pelo menos um documento para enviar.");
        return;
      }

      const uploadFile = async (file) => {
        const storageRef = ref(storage, `documentos/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };

      const downloadURLs = await Promise.all([
        NewLaudo ? uploadFile(NewLaudo) : null,
        Newdocumento ? uploadFile(Newdocumento) : null,
        Newdocumento2 ? uploadFile(Newdocumento2) : null,
      ]);

          const candidatosRef = collection(db, "Vagas", vagaId, "candidatos");
          const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
          const querySnapshot = await getDocs(QueryCandidatos);

      if (!querySnapshot.empty) {
        const candidatoDoc = querySnapshot.docs[0];
        const candidatoId = candidatoDoc.id;

        const candidatoDocRef = doc(db, "Vagas", vagaId, "candidatos", candidatoId);
        const documentosRef = collection(candidatoDocRef, "documentos");

        await addDoc(documentosRef, {
          nome: name,
          email: email,
          telefone: telefone,
          endereco: endereco,
          idade: idade,
          objetivo:objetivo,
          experiencias1: experiencia1,
          formacao_academica1: downloadURLs[0],
          formacao_academica2: downloadURLs[1],
          formacao_academica3: downloadURLs[2],
          idioma1: idiomas1,
          informatica: informatica,
          userId: userId
        });

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1:'Sucesso',
          text2: 'Envio de Documento.',
        });
        setLaudo(null);
        setDocumento(null);
        setDocumento2(null);
        navigation.navigate("Home");
      } else {
        console.error("Candidato não encontrado.");
        alert("Erro ao adicionar documento: candidato não encontrado.");
      }
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Erro ao Adicionar o documento.',
      });
    }
  };

  return (
    
    <ScrollView onScroll={Animated.event([{nativeEvent:{contentOffset:{y: scrollOffsetY} } },  ],
    {useNativeDriver:false} )} scrollEventThrottle={16} contentContainerStyle={style.scrollContainer}>
     <Animated.View style={[style.headerTopBar, {height: headerScrollHeight} ]}>
        <Text style={style.headerTopBarText}>Página de Cadastro</Text>
        <View style={style.row}>
        <Text style={style.headerLeftBarText}>Complete os dados abaixo para se candidatar</Text>
        <Video 
                source={require('../../img/Company.mp4')}
                style={style.video}
                resizeMode='cover'
                isLooping
                shouldPlay
            />
      </View>


      </Animated.View>
      <View style={style.container}>
        <View style={style.container2}>
          <View style={style.carregando}>
            <Image resizeMode="contain" source={require('../../img/logo.png')} style={style.logo} />
          </View>
        </View>
        <Text style={style.label}>Código Vaga</Text>     
        <View style={style.inputContainer}>
          <View style={style.iconContainer}>
             <Ionicons name="person-circle-outline" size={24} color="white" />
          </View>
         <TextInput
          value={vagaId}
          onChangeText={setNome}
          style={style.EntradaText}
          editable={false}
        />
       </View>

        <Text style={style.label}>Código do Usuário</Text>
           <View style={style.inputContainer}>
              <View style={style.iconContainer}>
                  <Ionicons name="person-circle-outline" size={24} color="white" />
              </View>
            <TextInput
              value={userUid}
              onChangeText={setNome}
              style={style.EntradaText}
              editable={false}
            />
         </View>
 
        <Text style={style.label}>Nome</Text>
           <View style={style.inputContainer}>
            <View style={style.iconContainer}>
             <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
            </View>
        
           <TextInput
             value={name}
             onChangeText={setNome}
             style={style.EntradaText}
            />
           </View>

        <Text style={style.label}>Email</Text>
           <View style={style.inputContainer}>
            <View style={style.iconContainer}>
             <MaterialIcons name="alternate-email" size={24} color="white" />
            </View>
         <MaskedTextInput
             value={email}
             keyboardType="email-address"
             onChangeText={(text) => setEmail(text)}
             placeholder="DaeLink@..."
               style={[style.EntradaText, {
               borderWidth:errors.email && 1,
               borderColor:errors.email &&'#ff375b'
           }]}
         />
        </View>

        <Text style={style.label}>Telefone</Text>
           <View style={style.inputContainer}>
             <View style={style.iconContainer}>
                <AntDesign name="phone" size={24} color="white" />
          </View>
          <MaskedTextInput
              value={telefone}
              onChangeText={setTelefone}
              type={'cell-phone'}
              mask="(99) 99999-9999"
              placeholder="(XX) XXXXX-XXXX"
                style={[style.EntradaText, {
                   borderWidth:errors.telefone && 1,
                   borderColor:errors.telefone &&'#ff375b'
                 }]}
           />
        </View>

        <Text style={style.label}>Endereço</Text>
             <View style={style.inputContainer}>
               <View style={style.iconContainer}>
               <Entypo name="address" size={24} color="white" />
             </View>
            <TextInput
                value={endereco}
                onChangeText={setEndereco}
                    style={[style.EntradaText, {
                    borderWidth:errors.endereco && 1,
                    borderColor:errors.endereco &&'#ff375b'
               }]}
        />
         {errors.endereco && <Text style={style.labelError}>{errors.endereco?.message}</Text>}
        </View>

        <Text style={style.label}>Idade</Text>
            <View style={style.inputContainer}>
              <View style={style.iconContainer}>
                <Fontisto name="date" size={24} color="white" />
            </View>
           <MaskedTextInput
               value={idade}
               onChangeText={setIdades}
                   style={[style.EntradaText, {
                   borderWidth:errors.idade && 1,
                   borderColor:errors.idade &&'#ff375b'
             }]}
                mask="99/99/9999"
                placeholder="DD/MM/AAAA"
        />
           {errors.idade && <Text style={style.labelError}>{errors.idade?.message}</Text>}
        </View>

           <Text style={style.label}>Objetivo Profissional</Text>
               <View style={style.inputContainer}>
                 <View style={style.iconContainer}>
                  <MaterialIcons name="work" size={24} color="white" />
                 </View>
               <TextInput
                   value={objetivo}
                   onChangeText={setObjetivo}
                   multiline={true}
                      style={[style.EntradaText, {
                      borderWidth:errors.objetivo && 1,
                      borderColor:errors.objetivo &&'#ff375b'
                    }]}
            />
              {errors.objetivo && <Text style={style.labelError}>{errors.objetivo?.message}</Text>}
        </View>
 
          <Text style={style.label}>Experiências</Text>
             <View style={style.inputContainer}>
               <View style={style.iconContainer}>
                 <Ionicons name="person-circle-outline" size={24} color="white" />
             </View>
               <TextInput
                 value={experiencia1}
                 onChangeText={setExperiencia1}
                 multiline={true}
                    style={[style.EntradaText, {
                      borderWidth:errors.experiencia1 && 1,
                      borderColor:errors.experiencia1 &&'#ff375b'
                    }]}
          />
                 {errors.experiencia1 && <Text style={style.labelError}>{errors.experiencia1?.message}</Text>}
             </View>

           <Text style={style.label}>Idioma 1</Text>
              <View style={style.inputContainer}>
              <View style={style.iconContainer}>
                 <Entypo name="language" size={24} color="white" />
             </View>

               <Picker
                 selectedValue={idiomas1}
                 onValueChange={(itemValue)=> setIdiomas1([itemValue])} 
                 multiline={true}
                    style={style.EntradaText}
                     >
                   <Picker.Item label="Selecione um idioma" value=""/>
                        <Picker.Item label='Inglês' value="Inglês"/>
                        <Picker.Item label='Espanhol' value="Espanhol"/>
                        <Picker.Item label='Frances' value="Frances"/>
                </Picker>
              </View>

             <Text style={style.label}>Informática</Text>
                 <View style={style.inputContainer}>
                     <View style={style.iconContainer}>
                        <Entypo name="info" size={24} color="white" />
                  </View>
                      <TextInput
                         value={informatica}
                         onChangeText={setInformatica}
                         multiline={true}
                            style={[style.EntradaText, {
                            borderWidth:errors.informatica && 1,
                            borderColor:errors.informatica &&'#ff375b'
                            }]}
                    />
                    {errors.informatica && <Text style={style.labelError}>{errors.informatica?.message}</Text>}
                  </View>

       <Text style={style.label}>Laudo Médico em PDF</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => PickerDocument(setLaudo)} style={style.imageButton}>
            <FontAwesome5 name="briefcase" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {NewLaudo && <Image source={{ uri: NewLaudo }} style={style.Imagem} />}
        </View>

        <Text style={style.label}>Documento em PDF</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => PickerDocument2(setDocumento)} style={style.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {Newdocumento && <Image source={{ uri: Newdocumento }} style={style.Imagem} />}
        </View>

        <Text style={style.label}>Documento Em IMAGEM caso prefira</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => handlePickFile3(setDocumento2)} style={style.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {Newdocumento2 && <Image source={{ uri: Newdocumento2 }} style={style.Imagem} />}
        </View>

        <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
      <Text style={style.submitButtonText}>Enviar Documentos</Text>
    </TouchableOpacity>
      </View>
    </ScrollView>
  );
}