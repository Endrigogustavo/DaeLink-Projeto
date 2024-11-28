import React, { useState, useEffect ,useRef} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Button,Animated } from 'react-native';
import Modal from 'react-native-modal';

import { auth,db,storage} from '../../../config/firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import {  collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import { Video } from 'expo-av';
import { Ionicons, MaterialIcons, AntDesign,Entypo,Fontisto,FontAwesome5} from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from "expo-document-picker"

import Toast from 'react-native-toast-message';
import Alert from '../../Alert/Alert';
import { Input, Block } from 'galio-framework';

import style from "./styleViDoc";

import * as yup from 'yup';
import { MaskedTextInput } from 'react-native-mask-text';



export default function Visualizar_Documento() {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        name: '',
        endereco: '',
        telefone: '',
        email: '',
        idade: '',
        objetivo: '',
        experiencia1: '', 
        idiomas: '',
        formacao_academica1:'',
        formacao_academica2:'',
        formacao_academica3:'',

    });  

    const schema = yup.object({
      name: yup.string()
      .min(3, "o nome deve ter pelo menos 3 caracters")
      .required("Nome Obrigatório"),
    
     
      endereco: yup.string()
       .min(6, "endereço deve conter pelo menos 6 caracteres")
       .required("Endereço obrigatório"),
    
     
    
      objetivo: yup.string()
        .min(10, "O seu objetivo deve conter no mínimo 10 caracteres"),
      
      experiencia1: yup.string()
        .min(10, "A sua experiência deve conter no mínimo 10 caracteres")
        .required("Experiência Obrigatória"),
      
      
    })
//Animação do Header
const H_MAX_HEGIHT = 150;
const H_MIN_HEGIHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEGIHT- H_MIN_HEGIHT
const scrollOffsetY = useRef(new Animated.Value(0)).current;

//Efeito do Header
const headerScrollHeight = scrollOffsetY.interpolate({
  inputRange: [0, H_SCROLL_DISTANCE],
  outputRange:[H_MAX_HEGIHT, H_MIN_HEGIHT],
  extrapolate: 'clamp'
})

//Variaveis do useState
    const [documentos, setDocumentos] = useState([]);
    const [NewLaudo, setNewLaudo] = useState(null);
    const [Newdocumento, setNewDocumento] = useState(null);
    const [Newdocumento2, setNewDocumento2] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [errors, setErrors] = useState({});
    
//Ids puxadas da página anterior
    const route = useRoute();
    const { vagaId, userId, idDoc} = route.params;

//Rederização da página
    useEffect(() => {
        const fetchDocumentos = async () => {
            try {
                if (!vagaId || !userId) {
                    console.error("vagaId ou userId faltando");
                    return;
                }
                const VagaInfo = collection(db, "Vagas", vagaId, "candidatos");
                const QueryDocs = query(VagaInfo, where('userId', '==', userId));
                const DocResult = await getDocs(QueryDocs);
    
                if (!DocResult.empty) {
                    DocResult.forEach(async (doc) => {
                        const documentosRef = collection(doc.ref, 'documentos');
                        const ResultDocumentos = await getDocs(documentosRef);
    
                        if (!ResultDocumentos.empty) {
                            let docsArray = [];
                            ResultDocumentos.forEach((documento) => {
                                docsArray.push({ id: documento.id, ...documento.data() });
                            });
                            setDocumentos(docsArray); 
    
                            if (docsArray.length > 0) {
                                const documento = docsArray[0];
                                
                                setUserData({
                                    name: documento.nome || '',
                                    email: documento.email || '',
                                    telefone: documento.telefone || '',
                                    endereco: documento.endereco || '',
                                    idade: documento.idade || '',
                                    objetivo: documento.objetivo || '',
                                    experiencia1: documento.experiencia1 || '',
                                    formacao_academica1: documento.formacao_academica1 || '',
                                    idiomas: documento.idiomas ? documento.idiomas[0]:'',
                                   
                                });
                            }
                        } else {
                            console.log("Nenhum documento encontrado.");
                        }
                    });
                } else {
                    alert("Nenhum candidato encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar documentos: ", error);
            }
        };
    
        fetchDocumentos();
    }, [vagaId, userId]);

  

    const PickerDocument = async () => {
      try{
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: true, 
         })
         if(!result.canceled && result.assets && result.assets.length > 0 ){
          const selectedFile = result.assets[0];
          setNewLaudo(selectedFile.uri);
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
          alert("Erro ao selecionar PDF:", error)
        } 
      };

      const PickerDocument2 = async () => {
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: true, 
         })
         if(!result.canceled && result.assets && result.assets.length > 0){
          const selectedFile = result.assets[0]
            setNewDocumento(selectedFile.uri)
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
            setNewDocumento2(selectedFile.uri)
         }else{
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Erro',
            text2: 'Erro ao selecionar documento tente novamente.',
          });
         }
        };

      const handleInputChange = (field, value) => {
        // Atualizar estado dos dados
        setUserData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };


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
  const hadleUpdate = async() => {
    try{

      await schema.validate(userData, { abortEarly: false });
     setErrors({})
    } catch(validationErrors){
      const formattedErrors = {};
      validationErrors.inner.forEach((error)=>{
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors)
      return;
     };
    try{
      
        const VagaInfo = collection(db, "Vagas", vagaId, "candidatos");
        const QueryDocs = query(VagaInfo, where('userId', '==', userId));
        const DocResult = await getDocs(QueryDocs);

        if (!DocResult.empty) {
            
          DocResult.forEach(async (docSnapshot) => {
            const documentosRef = collection(docSnapshot.ref, 'documentos');
            const ResultDocumentos = await getDocs(documentosRef);
        
            if (!ResultDocumentos.empty) {
                const documentoId = ResultDocumentos.docs[0].id;
                const documentoRef = doc(db, "Vagas", vagaId, "candidatos", docSnapshot.id, "documentos", documentoId);
        let updatedData = { ...userData };

        if (NewLaudo) {
          try{
            setIsUploading(true);
            const response = await fetch(NewLaudo);
            const blob = await response.blob();
            const storageRef = ref(storage, `documentos/${Date.now()}_doc.pdf`);
             await uploadBytes(storageRef, blob);
             const formacao_academica = await  getDownloadURL(storageRef);
             updatedData.formacao_academica1 = formacao_academica;
             setIsUploading(false);
              }catch(error){
                console.error("Erro ao enviar o arquivo: ", error)
             }
           };

        if (Newdocumento) {
            setIsUploading(true);
            try{
            const response = await fetch(Newdocumento);
            const blob = await response.blob();
            const storageRef = ref(storage, `documentos/${Date.now()}_doc.pdf`);
              await uploadBytes(storageRef, blob);
              const formacao_academica2 = getDownloadURL(storageRef);
              updatedData.formacao_academica2 = await  formacao_academica2;
              setIsUploading(false);
              }catch(error){
                console.error("Erro ao enviar o arquivo: ", error)
             }
           };
        

        if (Newdocumento2) {
          setIsUploading(true);
          try{
          const response = await fetch(Newdocumento2);
          const blob = await response.blob();
          const storageRef = ref(storage, `documentos/${Date.now()}_doc.pdf`);
            await uploadBytes(storageRef, blob);
            const formacao_academica3 = getDownloadURL(storageRef);
            updatedData.formacao_academica3 = await  formacao_academica3;
            setIsUploading(false);
            }catch(error){
              console.error("Erro ao enviar o arquivo: ", error)
           }
         };

        await updateDoc(documentoRef, updatedData);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1:'Sucesso',
          text2: 'Dados atualizado com sucesso.',
        });
        navigation.navigate("Home");
    } else {
        alert("Nenhum documento encontrado para atualizar.");
    }
});
            } else {
                alert("Nenhum candidato encontrado.");
            }
        } catch (error) {
            console.error("Erro ao atualizar os documentos: ", error);
            alert("Erro ao atualizar documentos.");
        }};
        
      const DeletDoc = async ()=>{
        const VagaInfo = collection(db, "Vagas", vagaId, "candidatos");
        const QueryDocs = query(VagaInfo, where('userId', '==', userId));
        const DocResult = await getDocs(QueryDocs);
            const candidatoDoc = DocResult.docs[0];
            const candidatoId = candidatoDoc.id;     
          try{   
            const candidatoDocRef =  doc(db, "Vagas", vagaId, "candidatos", candidatoId);
            const documentoDocRef = doc(candidatoDocRef, "documentos", idDoc)
            const docSnap = await getDoc(documentoDocRef)
           
            if(docSnap.exists()){
             console.log("Documento encontrado, deletando...");
             await deleteDoc(documentoDocRef);

             Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Sucesso',
              text2: 'Exclusão realizada com sucesso!',
            });
            navigation .navigate(`Home`);

            }else {
              console.log("Documento não encontrado");
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'Erro ao encontrar o documento',
              });
           } 
            }catch (error) {
            console.log(error)
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  text1: 'Erro',
                  text2: 'Erro ao Excluir Documento tente novamente.',
                });
            }
           setModalVisible(false)
      }

      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      }

      const handleConfirmDelect = () => {
        toggleModal();  
      };

    return(    
        <ScrollView onScroll={Animated.event([{nativeEvent:{contentOffset:{y: scrollOffsetY} } },  ],
            {useNativeDriver:false} )} scrollEventThrottle={16} contentContainerStyle={style.scrollContainer}>
             <Animated.View style={[style.headerTopBar, {height: headerScrollHeight} ]}>
                <Text style={style.headerTopBarText}>Página de Edição</Text>
                <View style={style.row}>
                <Text style={style.headerLeftBarText}>Altere seus documentos para ser enviado...</Text>
                <Video 
                        source={require('../../../img/Edicao.mp4')}
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
                  <View style={style.inputContainer}>
                   <View style={style.iconContainer}>
                    <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
                   </View>
                <TextInput
                    value={userData.name}
                    onChangeText={(text)=> setUserData({...userData, name:text})}
                    style={style.EntradaText}
                    
                />
                </View>

                <Text style={style.label}>Email</Text>
                     <View style={style.inputContainer}>
                     <View style={style.iconContainer}>
                          <MaterialIcons name="alternate-email" size={24} color="white" />
                       </View>
                    <TextInput
                    value={userData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    style={[style.EntradaText, {
               borderWidth:errors.email && 1,
               borderColor:errors.email &&'#ff375b'
           }]}
                />
            </View>
            {errors.email && <Text style={style.errorText}>{errors.email}</Text>}


            <Text style={style.label}>Telefone</Text>
                 <View style={style.inputContainer}>
                 <View style={style.iconContainer}>
                      <AntDesign name="phone" size={24} color="white" />
                 </View>
                 <TextInput
                    value={userData.telefone}
                    onChangeText={(text) => handleInputChange('telefone', text)}
                    type={'cell-phone'}
                    mask="(99) 99999-9999"
                    placeholder="(XX) XXXXX-XXXX"
                    style={[style.EntradaText, {
                   borderWidth:errors.telefone && 1,
                   borderColor:errors.telefone &&'#ff375b'
                 }]}
                />
            </View>
            {errors.telefone && <Text style={style.errorText}>{errors.telefone}</Text>}

                <Text style={style.label}>Endereço</Text>
                    <View style={style.inputContainer}>
                    <View style={style.iconContainer}>
                         <Entypo name="address" size={24} color="white" />
                    </View>
                    <TextInput
                    value={userData.endereco}
                    onChangeText={(text) => handleInputChange('endereco', text)}
                     style={[style.EntradaText, {
                    borderWidth:errors.endereco && 1,
                    borderColor:errors.endereco &&'#ff375b'
               }]}
                />
            </View>
            {errors.endereco && <Text style={style.errorText}>{errors.endereco}</Text>}


            <Text style={style.label}>Idade</Text>
                <View style={style.inputContainer}>
                <View style={style.iconContainer}>
                     <Fontisto name="date" size={24} color="white" />
                </View>
                <TextInput
                    value={userData.idade}
                    onChangeText={(text) => handleInputChange('idade', text)}
                    style={[style.EntradaText, {
                   borderWidth:errors.idade && 1,
                   borderColor:errors.idade &&'#ff375b'
             }]}
                />
            </View>
            {errors.idade && <Text style={style.errorText}>{errors.idade}</Text>}
 
                    <Text style={style.label}>Objetivo Profissional</Text>
                      <View style={style.inputContainer}>
                      <View style={style.iconContainer}>
                           <MaterialIcons name="work" size={24} color="white" />
                      </View>
                      <TextInput
                    value={userData.objetivo}
                    onChangeText={(text) => handleInputChange('objetivo', text)}
                    multiline={true}
                    style={[style.EntradaText, {
                      borderWidth:errors.objetivo && 1,
                      borderColor:errors.objetivo &&'#ff375b'
                    }]}
                />
            </View>
            {errors.objetivo && <Text style={style.errorText}>{errors.objetivo}</Text>}

                <Text style={style.label}>Experiências</Text>
                     <View style={style.inputContainer}>
                     <View style={style.iconContainer}>
                          <Ionicons name="person-circle-outline" size={24} color="white" />
                     </View>
                     <TextInput
                    value={userData.experiencia1}
                    onChangeText={(text) => handleInputChange('experiencia1', text)}
                    multiline={true}
                    style={[style.EntradaText, {
                      borderWidth:errors.experiencia1 && 1,
                      borderColor:errors.experiencia1 &&'#ff375b'
                    }]}
                />
            </View>
            {errors.experiencia1 && <Text style={style.errorText}>{errors.experiencia1}</Text>}

                <Text style={style.label}>Idioma Secundário</Text>
                     <View style={style.inputContainer}>
                     <View style={style.iconContainer}>
                          <Entypo name="language" size={24} color="white" />
                     </View>
                    <Picker
                     selectedValue={userData.idiomas}
                     onValueChange={(itemValue => handleInputChange('idiomas', itemValue))} 
                    multiline={true}
                    style={style.EntradaText}
                     >
                   <Picker.Item label="Selecione um idioma" value=""/>
                        <Picker.Item label='Inglês' value="Inglês"/>
                        <Picker.Item label='Espanhol' value="Espanhol"/>
                        <Picker.Item label='Frances' value="Frances"/>
                </Picker>
            </View>


       <Text style={style.label}>PDF laudo Médico</Text>
           <View style={style.imageContainer}>
              <TouchableOpacity onPress={() => PickerDocument(setNewLaudo)} style={style.imageButton}>
                 <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
             </TouchableOpacity>
             {NewLaudo &&(
            <> 
            <TouchableOpacity onPress={openPdf} style={style.imageButton}>
              <Text style={[style.buttonText, {color:'#fff'}]}>Visualizar PDF</Text>
           </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={style.label}>PDF laudo Médico</Text>
           <View style={style.imageContainer}>
              <TouchableOpacity onPress={() => PickerDocument2(setNewDocumento)} style={style.imageButton}>
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

        <Text style={style.label}>PDF comprovante</Text>
           <View style={style.imageContainer}>
              <TouchableOpacity onPress={() => PickerDocument3(setNewDocumento2)} style={style.imageButton}>
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

        <TouchableOpacity onPress={hadleUpdate} style={style.button} disabled={isUploading}>
          <Text style={style.buttonText}>Salvar</Text>
        </TouchableOpacity>
        {isUploading && <Text>Carregando...</Text>}

        <TouchableOpacity onPress={handleConfirmDelect} style={style.button} disabled={isUploading}>
          <Text style={style.buttonText}>Deletar Documento</Text>
        </TouchableOpacity>
        {isUploading && <Text>Carregando...</Text>}

<Modal isVisible={isModalVisible} onBackButtonPress={toggleModal}>
 <View style={Alert.modalContent}>
    <Text style={Alert.modalTitle}>Confirmação de Exclusão</Text>
    <Text style={Alert.modalText}>Tem certeza que deseja excluir?</Text>
    <View style={Alert.buttonContainer}>
    <TouchableOpacity style={Alert.cancelButton} onPress={toggleModal}>
       <Text style={Alert.buttonText}>Cancelar</Text>
    </TouchableOpacity>
        <TouchableOpacity onPress={DeletDoc} style={Alert.confirmButton} disabled={isUploading}>
          <Text style={Alert.buttonText}>Deletar Documento</Text>
        </TouchableOpacity>
     </View>
   </View>
</Modal>

            </View>
        </ScrollView>
    );
}
