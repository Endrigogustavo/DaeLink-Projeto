import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,Image, Button ,ScrollView, FlatList} from 'react-native';
import { auth,db } from '../../config/firebaseConfig';
import {getDocs, collection} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import styles from './styleEm'
import { Video } from 'expo-av';

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
<View style={styles.card}>
    <Text style={styles.cardText}></Text>
        <Image
  source={{ uri: item.imageUrl }}
  console={item.imageUrl}
  style={styles.empresaImage}
/>
<Text style={styles.cardText}>{item.name}</Text>
        
    <TouchableOpacity
    style={styles.button}
    onPress={() => handleButtonClick(item.id)}>
        <Text style={styles.buttonText}>Ver Perfil</Text>
    </TouchableOpacity>
</View>
    );

    const groupedData = empresa.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);
  
    const renderGroupedItem = ({ item }) => (
      <View style={styles.row}>
        {item.map((empresaItem) => (
          <View key={empresaItem.id} style={styles.cardContainer}>
            {renderItem({ item: empresaItem })}
          </View>
        ))}
      </View>
    );

    return (

        <View style={styles.container}>
        <View style={styles.headerTopbar}>
          <Text style={styles.headerTopBarText}>Empresas</Text>
          <View style={styles.row}>
          <Text style={styles.headerLeftBarText}>O lugar que você representa você e o que acredita</Text>
            <Video
               source={require('../../img/Company.mp4')}
               style={styles.video}
               resizeMode='contain'
               isLooping
               shouldPlay
              />
              </View>
        </View>

          <View>
            {Array.isArray(empresa) && empresa.length > 0 ? (
              <FlatList
                data={groupedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderGroupedItem}
                contentContainerStyle={styles.listContainer}
                
              />
            ) : (
              <Text style={styles.noVaga}>Não há empresa</Text>
            )}
          
        
            </View>  
        
        </View>
       
  );
}