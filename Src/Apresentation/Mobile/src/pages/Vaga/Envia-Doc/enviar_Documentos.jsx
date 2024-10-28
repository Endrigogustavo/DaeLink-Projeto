import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity,  Image, ScrollView, Animated, Alert, Linking } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';
import { db, storage, auth } from '../../../config/firebaseConfig';
import { doc, getDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, AntDesign,Entypo,Fontisto,FontAwesome5} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from "expo-document-picker"
import * as WebBrowser from 'expo-web-browser';

import { format,differenceInYears } from 'date-fns'; 
import { ptBR } from 'date-fns/locale'

import * as yup from 'yup';
import { MaskedTextInput } from 'react-native-mask-text';

import { Input, Block } from 'galio-framework';

import style from './style';

//Tratamento com yup
const schema = yup.object({
  name: yup.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .required("Nome é Obrigatório"),

    email: yup.string()
    .email("E-mail invalido")  
    .required("email é Obrigatório"),

  telefone: yup.string()
    .min(11,"Número invalido")  
    .required("Telefone é Obrigatório"),
  
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
  const [email, setemail] = useState("");
  const [idade, setIdades] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [experiencia1, setExperiencia1] = useState("");
  const [idiomas, setIdiomas1] = useState('');
 

  const [NewLaudo, setLaudo] = useState(null);
  const [Newdocumento, setDocumento] = useState(null);
  const [Newdocumento2, setDocumento2] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPdf, setShowPdf] = useState(false);

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
        setemail(data.email);
        setEndereco(data.endereco);
        setTelefone(data.telefone);
        setExperiencia1(data.experiencias);
        
        setIdades(format(data.idade + 'T00:00:00', 'dd/MM/yyyy', { locale: ptBR }));
        
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
    try{
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true, 
     })
       if(!result.canceled && result.assets && result.assets.length > 0 ){
      const selectedFile = result.assets[0];
      setLaudo(selectedFile.uri);
      console.log('PDF selecionado:', selectedFile.uri);
      
     }
     else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Erro ao selecionar o documento tente novamente.',
      });
  }
    }catch(error){
      alert.error("Erro ao selecionar PDF:", error)
    } 
  };
  

//Pegando Arquivo PDF 
  const PickerDocument2 = async () =>  {
   const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    copyToCacheDirectory: true, 
   })
   if(!result.canceled && result.assets && result.assets.length > 0){
    const selectedFile = result.assets[0]
      setDocumento(selectedFile.uri)
   }else{
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Erro',
      text2: 'Erro ao selecionar documento tente novamente.',
    });
   }
  };
   

  const PickerDocument3 = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true, 
     })
     if(!result.canceled && result.assets && result.assets.length > 0){
      const selectedFile = result.assets[0]
        setDocumento2(selectedFile.uri)
     }else{
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Erro ao selecionar documento tente novamente.',
      });
     }
    };
 
  //Cancelando quando for selecionado 
  const hadleCandelarPdf = () =>{
    setLaudo(null)
  } 
  //Visualizar PDF 
const openPdf = async() =>{
  if (NewLaudo){
    
    const result = await WebBrowser.openBrowserAsync(NewLaudo);
    if(result.type == 'locked'){
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Desculpe mas não foi possivel abrir seu arquivo',
      });
    }
    console.log('PDF visualizado:', result);
  }else{
    alert('Nenhum PDF selecionado para visualizar.');
  }
}

  //Função de enviar dados
   const handleSubmit = async () => {
   try {
    //Validação de formulário
      await schema.validate({
         name, email, telefone, endereco, idade, objetivo,experiencia1},
         { abortEarly: false } // Isso garante que todos os erros sejam capturados de uma vez
        );
        setErrors({});
           } catch (validationErrors) {
                const formattedErrors = {};
                 validationErrors.inner.forEach((error)=>{
                 formattedErrors[error.path] = error.message;
          });
         setErrors(formattedErrors); 
        };
    //consirmação de usuário
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("Usuário não autenticado.");
      alert("Você precisa estar autenticado para enviar documentos.");
      return;
    }
    
    try{
      //Retorno se há documento selecionado
      if (!NewLaudo && !Newdocumento && !Newdocumento2) {
        console.log("Por favor, selecione pelo menos um documento para enviar.");
        return;
      }

      //Função de envio de pdf
      const uploadFile = async (fileUri) => {
        try{
           const response = await fetch(fileUri);
           const blob = await response.blob();
           const storageRef = ref(storage, `documentos/${Date.now()}_doc.pdf`);
             await uploadBytes(storageRef, blob);
           return await getDownloadURL(storageRef);
              }catch(error){
                console.error("Erro ao enviar o arquivo: ", error)
             }
           };


      //Variavel que recebe todos os docs
      const downloadURLs = await Promise.all([
        NewLaudo ? uploadFile(NewLaudo) : null,
        Newdocumento ? uploadFile(Newdocumento) : null,
        Newdocumento2 ? uploadFile(Newdocumento2) : null,
      ]);

        //Redirecionando para o local de envio
        const candidatosRef = collection(db, "Vagas", vagaId, "candidatos");
        const QueryCandidatos = query(candidatosRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(QueryCandidatos);

      if (!querySnapshot.empty) {
             const candidatoDoc = querySnapshot.docs[0];
             const candidatoId = candidatoDoc.id;
     
             const candidatoDocRef = doc(db, "Vagas", vagaId, "candidatos", candidatoId);
             const documentosRef = collection(candidatoDocRef, "documentos");

        //Adicionando tudo que a pagina conter para o firebase
        await addDoc(documentosRef, {
          nome: name,
          email: email,
          telefone: telefone,
          endereco: endereco,
          idade: idade,
          objetivo:objetivo,
          experiencia1: experiencia1,
          formacao_academica1: downloadURLs[0],
          formacao_academica2: downloadURLs[1],
          formacao_academica3: downloadURLs[2],
          idiomas: idiomas,
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
                source={require('../../../img/cadastro.mp4')}
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
            <Image resizeMode="contain" source={require('../../../img/logo.png')} style={style.logo} />
          </View>
        </View>
        
 
        <Text style={style.label}>Nome</Text>
        
           <Input
             value={name}
             onChangeText={setNome}
             style={{ borderColor: "blue", borderRadius: 22 }}
             bottomHelp
             placeholderTextColor="#4F8EC9"
            />

        <Text style={style.label}>Email</Text>
      
            <Input
             value={email}
             onChangeText={setemail}
             keyboardType="email-address"
             placeholder="DaeLink@..."
              
               style={{ borderColor: "blue", borderRadius: 22 }}
               bottomHelp
               placeholderTextColor="#4F8EC9"
           
         />

        {errors.email && <Text style={style.errorText}>{errors.email}</Text>}

        <Text style={style.label}>Telefone</Text>
           <View style={style.inputContainer}>
          <MaskedTextInput
              value={telefone}
              onChangeText={setTelefone}
              type={'cell-phone'}
              mask="(99) 99999-9999"
              placeholder="(XX) XXXXX-XXXX"
                style={[style.EntradaText, {
                   borderWidth:errors.telefone && 1,
                   borderColor:errors.telefone &&'#ff375b',
                   borderColor: "blue", borderRadius: 22
                 }]}
                 bottomHelp
           />
        </View>
        {errors.telefone && <Text style={style.errorText}>{errors.telefone}</Text>}

        <Text style={style.label}>Endereço</Text>
  
            <Input
                value={endereco}
                placeholder='Digite seu endereço completo'
                onChangeText={setEndereco}
                    
                style={{ borderColor: "blue", borderRadius: 22 }}
            bottomHelp
            
              
        />
        {errors.endereco && <Text style={style.errorText}>{errors.endereco}</Text>}

        <Text style={style.label}>Idade</Text>
            <View style={style.inputContainer}>
  
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
        </View>
        {errors.idade && <Text style={style.errorText}>{errors.idade}</Text>}
           <Text style={style.label}>Objetivo Profissional</Text>
            
               <Input
                   value={objetivo}
                   onChangeText={setObjetivo}
                   placeholder='Insira seu objetivo'
                   multiline={true}
                   style={{ borderColor: "blue", borderRadius: 22 }}
            />
           {errors.objetivo && <Text style={style.errorText}>{errors.objetivo}</Text>}

          <Text style={style.label}>Experiências</Text>
     
               <Input
                 value={experiencia1}
                 onChangeText={setExperiencia1}
                 multiline={true}
                 placeholder='conte um pouco de suas experiências...'
                 style={{ borderColor: "blue", borderRadius: 22 }}
          />

             {errors.experiencia1 && <Text style={style.errorText}>{errors.experiencia1}</Text>}

           <Text style={style.label}>Idioma secundário</Text>
           <Input
                 value={idiomas}
                 onChangeText={setIdiomas1}
                 multiline={true}
                 placeholder='conte sobre as linguas que você fala...'
                 style={{ borderColor: "blue", borderRadius: 22 }}
          />


       <Text style={style.label}>Laudo Médico em PDF</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => PickerDocument(setLaudo)} style={style.imageButton}>
            <FontAwesome5 name="briefcase" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {NewLaudo &&(
            <> 
            <TouchableOpacity onPress={openPdf} style={style.imageButton}>
              <Text style={[style.buttonText, {color:'#fff'}]}>Visualizar PDF</Text>
           </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={style.label}>2 documento em PDF</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => PickerDocument2(setDocumento)} style={style.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {Newdocumento && (
            <>
            <TouchableOpacity onPress={openPdf} style={style.imageButton}>
              <Text style={[style.buttonText, {color:'#fff'}]}>Visualizar PDF</Text>
           </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={style.label}>3 documento Caso possua</Text>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => PickerDocument3(setDocumento2)} style={style.imageButton}>
            <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
          </TouchableOpacity>
          {Newdocumento2 && (
            <>
            <TouchableOpacity onPress={openPdf} style={style.imageButton}>
              <Text style={[style.buttonText, {color:'#fff'}]}>Visualizar PDF</Text>
           </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
      <Text style={style.submitButtonText}>Enviar Documentos</Text>
    </TouchableOpacity>
      </View>
    </ScrollView>
  );
}