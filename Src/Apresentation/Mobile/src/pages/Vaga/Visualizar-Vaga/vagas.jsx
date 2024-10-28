import { auth,db,storage } from '../../../config/firebaseConfig';
import React, { useState, useEffect , useRef,useMemo} from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView ,Image,ActivityIndicator, Animated, Easing} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { collection, getDocs } from 'firebase/firestore';
import styles from './styleVa';
import load from '../../load/load';
import { MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import { Video } from 'expo-av';

export default function Vagas() {
  
const [empresa, setEmpresa] = useState([]);
 const [vagas, setVagas] = useState([]);//[] é usado para iniciar um array vazio
 const navigation = useNavigation();//Ele é usado para acessar o objeto de navegação. Ele é util quando vc não pode passar a prop de navegação diretamente 
 const [loading, setLoading] = useState(true);

const H_MAX_HEGIHT = 150;
const H_MIN_HEGIHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEGIHT - H_MIN_HEGIHT;

const scrollOffSetY = useRef(new Animated.Value(0)).current;

const headerScrollHeight =  useMemo(() =>
  scrollOffSetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEGIHT, H_MIN_HEGIHT],
    extrapolate: 'clamp',
  }), 
  [scrollOffSetY]
);


 useEffect(() => {

  //"fetch" em código, ele se refere a uma ação de buscar ou recuperar dados de algum lugar, normalmente de um servidor ou banco de dados.

  const fetchVagas = async () => {
    try {
      const vagaCollection = collection(db, "Vagas");
      const vagaSnapshot = await getDocs(vagaCollection);
      const vagaList = vagaSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setVagas(vagaList);
    } catch (error) {
      console.error("Erro ao buscar vagas: ", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchEmpresa = async() => {
    const empresaCollection = collection(db, 'Empresa');
    const empresaSnapshot = await getDocs(empresaCollection);
    const empresaList = empresaSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    setEmpresa(empresaList);
  
  };
  fetchVagas();
  fetchEmpresa();
}, []);

const getEmpresaImage = (empresaId) => {
  const empresaData = empresa.find((e) => e.id === empresaId); 
  return empresaData ? empresaData.imageUrl : null; 
};

const handleButtonClick = (vagaId)=> {
  navigation.navigate('Entrar-Vaga', {vagaId:vagaId ,userId: auth.currentUser.uid});
};

const renderItem = ({item}) =>(
    <View style={styles.card}>
        <View style={styles.cardContent}>
        {getEmpresaImage(item.empresaId) && (
        <Image
          source={{ uri: getEmpresaImage(item.empresaId) }}
          style={styles.empresaImage} 
        />
      )}
      <View style={styles.infoContainer}>
      <Text style={styles.cardTitle}> {item.area}</Text>
      <Text style={styles.cardText}><FontAwesome5 name="business-time" style={styles.icon} size={16} color="#888" />:  {item.tipo}</Text>
       <View style={styles.row}>
        <Text style={styles.cardText}> <MaterialIcons name="location-on"  style={styles.icon} size={16} color="#888" />: {item.local}</Text>
        <Text style={styles.cardText}><FontAwesome5 name="money-bill-wave" style={styles.icon} size={16} color="#888" />: {item.salario}</Text>
        </View>
     </View>
    </View>
      <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleButtonClick(item.id)}>
          <Text style={styles.buttonText}>Candidatar-me</Text>
      </TouchableOpacity>
      
  </View>
);

if(loading){
  return (
    <View style={load.container2}>
        <View style={load.carregando}>
        <Image resizeMode='contain' source={require('../../../img/logo.png')} style={load.logo} />
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={load.text}>Carregando...</Text>
              </View>
            </View>
          );
        }

  return (
    
      <View style={styles.container}>
        <Animated.View style={[styles.headerTopbar,{height:headerScrollHeight}]}
        shouldRasterizeIOS={true}
        renderToHardwareTextureAndroid={true}>
        <Text style={styles.headerTopBarText}>Vagas</Text>
        <View style={styles.row}>
            <Text style={styles.headerLeftBarText}>Explore as vagas disponíveis no momento</Text>
            <Video 
                source={require('../../../img/vagas.mp4')}
                style={styles.video}
                resizeMode='cover'
                isLooping
                shouldPlay
            />
        </View>
      </Animated.View>
           {Array.isArray(vagas) && vagas.length > 0 ? (
                 <Animated.FlatList
                 data={vagas}
                 keyExtractor={(item)=> item.id.toString()}//o flatList usa sempre strings enyão coverto para string
                 renderItem={renderItem}// sempre usa para rederizar o item
                 contentContainerStyle={styles.listContainer}
                 onScroll={Animated.event([{
                  nativeEvent: {contentOffset:{y:scrollOffSetY} } }, 
                  ],{useNativeDriver: false})}
                  scrollEventThrottle={64}
                  />
              ):(
           <Text style={styles.noVaga}>Não há vagas</Text>
         )}
         
        </View>
      );
    }