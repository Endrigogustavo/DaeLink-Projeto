import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, ScrollView, FlatList,ActivityIndicator} from 'react-native';
import { auth,db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/core';
import styles from './stylePro'; 
import { collection, query, where, getDocs, getDoc,doc } from 'firebase/firestore';
import load from '../load/load';
import { MaterialIcons,FontAwesome5,FontAwesome6 } from '@expo/vector-icons';
import { Video } from 'expo-av';

export default function Processo() {
    //Variaveis que armazenam, e buscam resultados 
   const navigation = useNavigation();
   const [vagas, setVagas] = useState([]);//array vazio
   const [userId, setUserId] = useState(['']);//
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (auth.currentUser) {
        setUserId(auth.currentUser.uid);
    }
    const fetchVagas = async () =>{
        try{
            const vagasRef = collection(db, 'Vagas');
            const vagaSnapshot = await getDocs(vagasRef);
            let vagasDoCandidato = [];

            for (const vagaDoc of vagaSnapshot.docs) {
                const candidatosRef = collection(vagaDoc.ref, 'candidatos');
                const q = query(candidatosRef, where('userId', '==', auth.currentUser.uid));
                const candidatosSnapshot = await getDocs(q);
                if (!candidatosSnapshot.empty) {
                    vagasDoCandidato.push({ id: vagaDoc.id, ...vagaDoc.data() });
                }
            }

            const vagasWithEmpresaDetails = await Promise.all(
                vagasDoCandidato.map(async (vaga) => {
                    if (vaga.empresaId) {
                        const empresaDoc = await getDoc(doc(db, "Empresa", vaga.empresaId));
                        if(empresaDoc.exists()){
                          const empresaData = empresaDoc.data();
                          return{
                            ...vaga,
                            empresa: {
                                nome: empresaData.name,
                                imageUrl: empresaData.imageUrl,
                                imageProfile: empresaData.imageProfile,
                            }
                        };
                    }
                }
                return vaga;
            })
        );

        setVagas(vagasWithEmpresaDetails);

    } catch (error) {
        console.error('Erro ao buscar vagas: ', error);
    } finally {
        setLoading(false);
    }
};

    fetchVagas();
}, [userId]);


const handleChat = (empresaId) =>{
    const currentUserId = auth.currentUser ? auth.currentUser.uid : userId;
    navigation.navigate('chat',{empresaId:empresaId, userId: currentUserId} );
}
    const handleButtonClick = async (vagaId) => {
        const VagaInfo = collection(db, "Vagas", vagaId,"candidatos");
        const QueryDocs = query(VagaInfo, where('userId', '==', auth.currentUser.uid));
        const DocResult = await getDocs(QueryDocs);
        if (!DocResult.empty) {
            const DocRef = collection(db, "Vagas", vagaId, "candidatos", DocResult.docs[0].id, "documentos");
            const GetDoc = await getDocs(DocRef);
            if (!GetDoc.empty) {
                console.log("possui Doc")
                const documentoDoc = GetDoc.docs[0]; 
                const idDoc = documentoDoc.id;
                navigation.navigate('Visualizar Documento', { vagaId: vagaId, userId: auth.currentUser.uid,idDoc: idDoc});
            } else {
                console.log("Não possui doc")
                navigation.navigate('documento', { vagaId: vagaId, userId: auth.currentUser.uid });
            }
        } else {
            console.log("Usuário não encontrado");
        }};

    const renderItem = ({ item }) => (
        
        <View style={styles.card}>
        <Text style={styles.cardText}><Text style={styles.boldText}>Situação: </Text>{item.situação}</Text>
          <View style={styles.cardContent}>
          
           {item.empresa && (
                       <>
                           <Image source={{ uri: item.empresa.imageUrl }} style={styles.empresaImage} />
                       </>
                   )}
            <View style={styles.infoContainer}>
          
            <View style={styles.row}>
            <Text style={styles.cardText}> <MaterialIcons name="work" style={styles.icon} size={16} color="#888" />   {item.area} </Text>
            <Text style={styles.cardText}><FontAwesome5 name="business-time" style={styles.icon} size={16} color="#888" />  {item.exigencias}</Text>
            <View style={styles.row2}>
            <Text style={styles.cardText}><FontAwesome6 name="money-bill-wave" style={styles.icon} size={16} color="#888" /> {item.salario}</Text>
            <Text style={styles.cardText}><FontAwesome5 name="business-time" style={styles.icon} size={16} color="#888" />  {item.tipo}</Text>
            <Text style={styles.cardText}><FontAwesome6 name="map-location-dot" style={styles.icon} size={16} color="#888" />  {item.local}</Text>
               </View>
            </View>
          </View>
        </View>
        <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleButtonClick(item.id)}>
                <Text style={styles.buttonText}>Documento</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleChat(item.empresaId,)}>
                <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
    </View>
    );

    if (loading) {
        return (
          <View style={load.container2}>
          <View style={load.carregando}>
            <Image resizeMode='contain' source={require('../../img/logo.png')} style={load.logo} />
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={load.text}>Loading...</Text>
            </View>
          </View>
        );
      }

    return (
        <View style={styles.container}>
        <View style={styles.headerTopBar}>
        <Text style={styles.headerTopBarText}>Processo</Text>
        <View style={styles.row}>
            <Text style={styles.headerLeftBarText}>Explore suas candidaturas já feitas aqui</Text>
            <Video 
                source={require('../../img/Company.mp4')}
                style={styles.video}
                resizeMode='cover'
                isLooping
                shouldPlay
            />
        </View>
</View>
       
            {Array.isArray(vagas) && vagas.length > 0 ? (
                        <FlatList
                            data={vagas}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <Text style={styles.noVaga}>Não há vagas</Text>
                    )}
           </View>
      
    );
}
