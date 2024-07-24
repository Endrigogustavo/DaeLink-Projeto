import { auth,db,storage } from '../../config/firebaseConfig';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { collection, getDocs } from 'firebase/firestore';
import styles from './styleVa';


export default function Vagas() {
  
 const [vagas, setVagas] = useState([]);
 const navigation = useNavigation();

useEffect(() => {
  const fetchVagas = async() =>{
  const vagaCollection = collection(db, "Vagas");
  const vagaSnapshot = await getDocs(vagaCollection);
  const vagaList = vagaSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  setVagas(vagaList);
};
     fetchVagas();
},
[]);

const handleButtonClick = (vagaId)=> {
  navigation.navigate('Entrar-Vaga', {vagaId:vagaId ,userId: auth.currentUser.uid});

};

const renderItem = ({item}) =>(
    <View style={styles.row}>
          <Text style={styles.cell}>{item.empresaId}</Text>
          <Text style={styles.cell}>{item.area}</Text>
          <Text style={styles.cell}>{item.detalhes}</Text>
          <Text style={styles.cell}>{item.empresa}</Text>
          <Text style={styles.cell}>{item.exigencia}</Text>
          <Text style={styles.cell}>{item.local}</Text>
          <Text style={styles.cell}>{item.salario}</Text>
          <Text style={styles.cell}>{item.tipo}</Text>
          <Text style={styles.cell}>{item.vaga}</Text>
          
      <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleButtonClick(item.id)}>
          <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <View style={styles.headerTopbar}>
        <Text style={styles.headerTopBarText}>Vagas</Text>
      </View>

      <ScrollView horizontal>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Vaga</Text>
            <Text style={styles.heading}>Área</Text>
            <Text style={styles.heading}>Detalhes</Text>
            <Text style={styles.heading}>Empresa</Text>
            <Text style={styles.heading}>Exigencias</Text>
            <Text style={styles.heading}>Local</Text>
            <Text style={styles.heading}>Salário</Text>
            <Text style={styles.heading}>Tipo</Text>
            <Text style={styles.heading}>Vaga</Text>
            <Text style={styles.heading}>Entrar</Text>
          </View>

      {Array.isArray(vagas) && vagas.length > 0 ?(
             <FlatList 
                 data={vagas}
                 keyExtractor={(item)=> item.id.toString()}
                 renderItem={renderItem}
      
        />
      ): (
              <Text style={styles.noVaga}>Não há vagas</Text>
      )}
        
        </View>
      </ScrollView>
    </View>
  );
}