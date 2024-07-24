import React, {useState , useCallback, useEffect}from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation, useFocusEffect , useRoute} from '@react-navigation/native';
import {doc, collection, getDoc , addDoc} from 'firebase/firestore';
import styles from "./styleEn";
import Toast from 'react-native-toast-message';
import Vagas from './vagas';


export default function EntrarVaga(){
        const route = useRoute();
        const { vagaId, userId } = route.params;

        const [vagas, setVagas] = useState([]);
        const [userUid, setUserUid]= useState(userId);

        const[userData, setUserData] = useState({
            name:'',
            email:'',
        
         });

        
        const navigation = useNavigation();

        useFocusEffect(
            useCallback(() => {
                const fetchVagaDetails = async () => {
                    const docRef = doc(db, 'Vagas', vagaId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()){
                        setVagas(docSnap.data());
                    }else{
                        console.log('Vaga não encontrada');
                    }
                };
                fetchVagaDetails();
            },[vagaId])
        );
        
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

          const handleSubmit = async () => {
           
    
            try {
                const vagaRef = doc(db, "Vagas", vagaId);
                const candidatosRef = collection(vagaRef, 'candidatos');
                await addDoc(candidatosRef, {
                    userId: userId,
                    nome: userData.name,
                    email: userData.email
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
                    text2: 'Erro ao adicionar pessoa.',
                  });
                }
              };
            
        
    return(    
        <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.container2}>
      <View style={styles.carregando}>
      <Image source={require('../../img/logo.png')} style={styles.logo} />
      </View>
      </View>

        <View style={styles.header}>
          <View style={styles.container}>


          <Text style={styles.label}>Id Usuário</Text>
        <TextInput style={styles.EntradaText}
            value={userUid}
            onChangeText={(text)=> setUserData({ userId:text})}
        />

        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.EntradaText}
            value={userData.name}
            onChangeText={(text)=> setUserData({...userData, name:text})}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.EntradaText} 
         value={userData.email}
         onChangeText={(text)=> setUserData({...userData, email: text})}
        />
         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
         <Text style={styles.buttonText}>Entrar</Text>
         </TouchableOpacity>
        </View>

       

        </View>
        </ScrollView>
    )
}