import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, ScrollView, FlatList,ActivityIndicator} from 'react-native';
import { auth,db } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/core';
import styles from './stylePro'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Processo() {
    const navigation = useNavigation();
    const [vagas, setVagas] = useState([]);
   const [userId, setUserId] = useState(['']);


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
            
            setVagas(vagasDoCandidato);
        } catch (error) {
            console.error("Erro ao buscar vagas: ", error);
        }
    };

    fetchVagas();
}, [userId]);


    const handleButtonClick = (vagaId) => {
     navigation.navigate('documento', {vagaId:vagaId, userId: auth.currentUser.uid});
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.vaga}</Text>
            <Text style={styles.cell}>{item.area}</Text>
            <Text style={styles.cell}>{item.empresa}</Text>
            <Text style={styles.cell}>{item.exigencia}</Text>
            <Text style={styles.cell}>{item.salario}</Text>
            <Text style={styles.cell}>{item.tipo}</Text>
            <Text style={styles.cell}>{item.local}</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleButtonClick(item.id)}>
                <Text style={styles.buttonText}>Documento</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
        <View style={styles.headerTopBar}>
            <Text style={styles.headerTopBarText}>Processo</Text>
        </View>

        <ScrollView horizontal>
           <View>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Vaga</Text>
                <Text style={styles.heading}>Área</Text>
                <Text style={styles.heading}>Empresa</Text>
                <Text style={styles.heading}>Exigencias</Text>
                <Text style={styles.heading}>Salário</Text>
                <Text style={styles.heading}>Tipo</Text>
                <Text style={styles.heading}>Local</Text>

            </View>
            {Array.isArray(vagas) && vagas.length > 0 ? (
                        <FlatList
                            data={vagas}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItem}
                        />
                    ) : (
                        <Text style={styles.noVaga}>Não há vagas</Text>
                    )}
           </View>
        </ScrollView>
        </View>
    );
}
