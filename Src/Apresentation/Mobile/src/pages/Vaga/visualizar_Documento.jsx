import React, { useState, useEffect ,useRef} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Button,Animated } from 'react-native';
import { auth,db,storage} from '../../config/firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import {  collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'; 
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import Toast from 'react-native-toast-message';
import Alert from '../Alert/Alert';
import { Ionicons, MaterialIcons, AntDesign,Entypo,Fontisto,FontAwesome5} from '@expo/vector-icons';
import style from "./styleViDoc";
import { Video } from 'expo-av';
import Modal from 'react-native-modal'; 

export default function Visualizar_Documento() {
    const navigate = useNavigation();

    const [userData, setUserData] = useState({
        name: '',
        endereco: '',
        telefone: '',
        email: '',
        idade: '',
        objetivo: '',
        experiencias1: '', 
        idioma1: '',
        informatica: '',
        formacao_academica1:'',
        formacao_academica2:'',
        formacao_academica3:'',

    });  
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
                                    experiencias1: documento.experiencias1 || '',
                                    formacao_academica1: documento.formacao_academica1 || '',
                                    idioma1: documento.idioma1 ? documento.idioma1[0]:'',
                                    informatica: documento.informatica || '',
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

    const handlePickFile = async (setFile) => {
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
      const handlePickFile2 = async (setFile) => {
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
    const handleInputChange = (field, value) => {
        setUserData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

  const hadleUpdate = async() => {
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
            setIsUploading(true);
            const response = await fetch(NewLaudo);
            const blob = await response.blob();
            const storageRef = ref(storage, `documentos/${userId}/${documentoId}`);
            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
            updatedData.imageUrl = imageUrl;
            setIsUploading(false);
        }

        if (Newdocumento) {
            setIsUploading(true);
            const response = await fetch(Newdocumento);
            const blob = await response.blob();
            const storageRef = ref(storage, `documentos/${userId}/${documentoId}`);
            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
            updatedData.imageUrl = imageUrl;
            setIsUploading(false);
        }

        if (Newdocumento2) {
            setIsUploading(true);
            const response = await fetch(Newdocumento2);
            const blob = await response.blob();
            const storageRef = ref(storage, `documentos/${userId}/${documentoId}`);
            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
            updatedData.imageUrl = imageUrl;
            setIsUploading(false);
        }

        await updateDoc(documentoRef, updatedData);
        alert('Dados atualizados com sucesso!');
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
         await deleteDoc(documentoDocRef)
             console.log("Documento encontrado, deletando...");
             await deleteDoc(documentoDocRef);

             Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Sucesso',
              text2: 'Exclusão realizada com sucesso!',
            });
             navigate.navigate(`Home`);

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
                    style={style.EntradaText}
                />
            </View>

            <Text style={style.label}>Telefone</Text>
                 <View style={style.inputContainer}>
                 <View style={style.iconContainer}>
                      <AntDesign name="phone" size={24} color="white" />
                 </View>
                <TextInput
                    value={userData.telefone}
                    onChangeText={(text) => handleInputChange('telefone', text)}
                    style={style.EntradaText}
                />
            </View>

                <Text style={style.label}>Endereço</Text>
                    <View style={style.inputContainer}>
                    <View style={style.iconContainer}>
                         <Entypo name="address" size={24} color="white" />
                    </View>
                <TextInput
                    value={userData.endereco}
                    onChangeText={(text) => handleInputChange('endereco', text)}
                    style={style.EntradaText}
                />
            </View>

            <Text style={style.label}>Idade</Text>
                <View style={style.inputContainer}>
                <View style={style.iconContainer}>
                     <Fontisto name="date" size={24} color="white" />
                </View>
                <TextInput
                    value={userData.idade}
                    onChangeText={(text) => handleInputChange('idade', text)}
                    style={style.EntradaText}
                />
            </View>
 
                    <Text style={style.label}>Objetivo Profissional</Text>
                      <View style={style.inputContainer}>
                      <View style={style.iconContainer}>
                           <MaterialIcons name="work" size={24} color="white" />
                      </View>
                <TextInput
                    value={userData.objetivo}
                    onChangeText={(text) => handleInputChange('objetivo', text)}
                    multiline={true}
                    style={style.EntradaText}
                />
            </View>


                <Text style={style.label}>Experiências</Text>
                     <View style={style.inputContainer}>
                     <View style={style.iconContainer}>
                          <Ionicons name="person-circle-outline" size={24} color="white" />
                     </View>
                <TextInput
                    value={userData.experiencias1}
                    onChangeText={(text) => handleInputChange('experiencias1', text)}
                    multiline={true}
                    style={style.EntradaText}
                />
            </View>

                <Text style={style.label}>Idioma 1</Text>
                     <View style={style.inputContainer}>
                     <View style={style.iconContainer}>
                          <Entypo name="language" size={24} color="white" />
                     </View>
                <TextInput
                    value={userData.idioma1}
                    onChangeText={(text) => handleInputChange('idioma1', text)}
                    multiline={true}
                    style={style.EntradaText}
                />
            </View>

               <Text style={style.label}>Informática</Text>
                   <View style={style.inputContainer}>
                   <View style={style.iconContainer}>
                   <Entypo name="info" size={24} color="white" />
                     </View>
                <TextInput
                    value={userData.informatica}
                    onChangeText={(text) => handleInputChange('informatica', text)}
                    multiline={true}
                    style={style.EntradaText}
                />
            </View>

       <Text style={style.label}>Imagem de Perfil</Text>
           <View style={style.imageContainer}>
              <TouchableOpacity onPress={() => handlePickFile(setNewLaudo)} style={style.imageButton}>
                 <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
             </TouchableOpacity>
          {NewLaudo && <Image source={{ uri: NewLaudo }} style={style.Imagem} />}
        </View>

        <Text style={style.label}>Imagem de Perfil</Text>
           <View style={style.imageContainer}>
              <TouchableOpacity onPress={() => handlePickFile2(setNewDocumento)} style={style.imageButton}>
                 <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
             </TouchableOpacity>
          {Newdocumento && <Image source={{ uri: Newdocumento }} style={style.Imagem} />}
        </View>

        <Text style={style.label}>Imagem de Perfil</Text>
           <View style={style.imageContainer}>
              <TouchableOpacity onPress={() => handlePickFile3(setNewDocumento2)} style={style.imageButton}>
                 <Ionicons name="cloud-upload-outline" size={30} color="#000" style={style.uploadIcon} />
             </TouchableOpacity>
          {Newdocumento2 && <Image source={{ uri: Newdocumento2 }} style={style.Imagem} />}
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
