import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,Image, Button ,ScrollView, FlatList} from 'react-native';
import { auth,db } from '../../config/firebaseConfig';
import {getDocs, collection} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import styles from './styleEm'




export default function Empresas() {

const [empresa, setEmpresa] = useState([]);
const navigation = useNavigation();

useEffect(() => {
 const fetchEmpresa = async() => {
    const empresaCollection = collection(db, 'Empresa');
    const empresaSnapshot = await getDocs(empresaCollection);
    const empresaList = empresaSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    setEmpresa(empresaList);
 };
fetchEmpresa();
},
[]);

const handleButtonClick = (empresaId) =>{
    navigation.navigate('Perfil-Empresa', {empresaId:empresaId,  userId: auth.currentUser.uid});
}

    const renderItem = ({item})=>(
<View style={styles.row}>
    <Text style={styles.cell}>{item.name}</Text>
    <Text style={styles.cell}>{item.email}</Text>
    <Text style={styles.cell}>{item.endereco}</Text>

    <TouchableOpacity
    style={styles.button}
    onPress={() => handleButtonClick(item.id)}>
        <Text style={styles.buttonText}>Ver Perfil</Text>
    </TouchableOpacity>
</View>
    );

    return (
<ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container2}> 
        <View style={styles.carregando}>
          <Image source={require('../../img/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.container}>
        <View style={styles.headerTopbar}>
          <Text style={styles.headerTopBarText}>Vagas</Text>
        </View>

        
          <ScrollView horizontal>
          <View>
          <View style={styles.headingContainer}>
              <Text style={styles.heading}>Empresas</Text>
              <Text style={styles.heading}>Email</Text>
              <Text style={styles.heading}>Endereço</Text>
              <Text style={styles.heading}></Text>
          </View>

            {Array.isArray(empresa) && empresa.length > 0 ? (
              <FlatList
                data={empresa}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
              />
            ) : (
              <Text style={styles.noVaga}>Não há empresa</Text>
            )}
          
        
            </View>  
        </ScrollView>
        </View>
        </View>
        </ScrollView>
  );
}