import React, {useState , useCallback, useEffect}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../../../config/firebaseConfig';
import { useNavigation, useFocusEffect , useRoute} from '@react-navigation/native';
import {doc, collection, getDoc , addDoc,getDocs} from 'firebase/firestore';
import styles from "./styleEn";
import Toast from 'react-native-toast-message';
import Vagas from '../Visualizar-Vaga/vagas';


export default function EntrarVaga(){
        const route = useRoute();
        const { vagaId, userId } = route.params;

        const [vagas, setVagas] = useState(null);
        const[ empresaData, setEmpresaData] = useState(null);
        const [userUid, setUserUid]= useState(userId);
        const navigation = useNavigation();
        const[pessoaId, setpessoaId] = useState({
            name:'',
            email:'',
         });
         
      console.log(empresaData)
        useFocusEffect(
            useCallback(() => {
                const fetchVagaDetails = async () => {
                  try{
                    const docRef = doc(db, 'Vagas', vagaId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()){
                        setVagas(docSnap.data());
                    }else{
                        console.log('Vaga não encontrada');
                    }
                  }catch(error){
                    console.error('Erro ao encontrar a vaga', error);
                }
              }
                fetchVagaDetails();
            },[vagaId])
        );
        
        useEffect(() => {
            const fetchData = async () => {
              try{
             const [userSnap, vagaSnap]= await Promise.all([
              getDoc(doc(db, 'PCD', auth.currentUser.uid)),
              getDoc(doc(db, 'Vagas', vagaId)),
             ]);

              if (userSnap.exists()) {
                setpessoaId(userSnap.data());
              } else {
                console.log("Documento não encontrado");
              }
              if(vagaSnap.exists()){
                const vagaData = vagaSnap.data();
                setVagas(vagaData);

              if(vagaData.empresaId){
                const empresaDoc = await getDoc(doc(db, "Empresa", vagaData.empresaId));
                if (empresaDoc.exists()){
                  setEmpresaData(empresaDoc.data());
                }else{
                  console.log("empresa não encontrada");
                }
              }
            }else{
              console.log("vaga não encontrada");
            }
          }catch (error){
            console.error("Erro ao buscar dados:", error)
          }};
          fetchData();}
          ,[vagaId]);
        
          const handleSubmit = async () => {
            try {
                const vagaRef = doc(db, "Vagas", vagaId);
                const candidatosRef = collection(vagaRef, 'candidatos');

                const cadidatosSnapshot = await getDocs(candidatosRef);
                const userExist = cadidatosSnapshot.docs.some(doc => doc.data().userId === userId);

                if (userExist){
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro',
                    text2: 'Você lá esta cadastrado na vaga!',
                  }); return;
                }

                await addDoc(candidatosRef, {
                    userId: userId,
                    name: pessoaId.name,
                    email: pessoaId.email,
                    situação: "Pendente"
                  
                });
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Sucesso',
                    text2: 'Pessoa adicionada com sucesso!',
                  });

                  navigation.navigate('Home');
                } catch (error) {
                  console.error("Erro ao buscar vagas: ", error);
                  Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro',
                    text2: 'Erro ao adicionar pessoa na vaga tente novamente!',
                  });
                }
              };
            
        
    return(    
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
          <View style={styles.TopBar}>
          <View style={styles.row}>
          {empresaData && (
                       <>
                           <Image source={{ uri: empresaData.imageUrl }} style={styles.empresaImage} />
                       </>
                   )}
                   {empresaData &&(
                    <>
              <View style={styles.colum}>
                 <Text style={styles.headerTopBarText}>{empresaData.name} </Text>
                 <Text style={styles.headerBarText}>{vagas.vaga}</Text>
              </View>
                 </>
                   )}
               </View>
        {vagas &&(
                <>
               <View style={styles.Informacoes}>
                    <Text style={styles.TextInf}>Informações</Text>
                    <Text  style={styles.inf}>Detalhes: {vagas.detalhes}</Text>
                    <Text style={styles.inf}>Empresa: {vagas.empresa}</Text>
                    <Text style={styles.inf}>Exigências: {vagas.exigencias}</Text>
                    <Text style={styles.inf}>Salário: {vagas.salario}</Text>
                    <Text style={styles.inf}>Endereço: {vagas.local}</Text>
                    <Text style={styles.inf}>Tipo: {vagas.tipo}</Text>
               </View>
           </> )}
       </View>

          <View style={styles.containerForm}>

         <Text style={styles.label}>Nome completo</Text>
              <TextInput style={styles.EntradaText}
                  value={pessoaId.name}
                  onChangeText={(text)=> setUserData({...userData, name:text})}
              />

         <Text style={styles.label}>Email</Text>
              <TextInput style={styles.EntradaText} 
               value={pessoaId.email}
               onChangeText={(text)=> setUserData({...userData, email: text})}
              />
              <View>
              {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Candidatar</Text>
              </TouchableOpacity>*/}
              
              <Text style={styles.status}>
                  <Text style={styles.statusLabel}>Status: </Text> 
                      {vagas ? vagas.status : 'Carregando'}</Text>
              {vagas && vagas.status === 'Aberta' && (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Candidatar</Text>
                  </TouchableOpacity>
                    )}
                  
                    {vagas && vagas.status === 'Fechada' && (
                      <Text style={styles.StatusText}>A vaga está fechada.</Text>
                    )}
                  
                    {vagas && vagas.status === 'Preenchida' && (
                      <Text style={styles.StatusText}>A vaga já foi preenchida.</Text>
                    )}
                </View>
             </View>
            </View>
        </ScrollView>
    )
}