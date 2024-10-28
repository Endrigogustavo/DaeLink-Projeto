import { View, Text ,Image,ScrollView,ActivityIndicator} from 'react-native';
import React, {useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatHeader from './chatHeader'
import ChatInputs from './ChatInputs'
import MessagesList from './MessagesList'
import { auth, db } from '../../config/firebaseConfig';
import { useNavigation, useFocusEffect , useRoute} from '@react-navigation/native';
import { addDoc, collection, orderBy, query, where, serverTimestamp, limit, getDoc, doc, getDocs } from 'firebase/firestore';
import load from '../load/load';
export default function Chat() {

  const [loading, setLoading] = useState(true);//Load
  const [userData, setEmpresaProfile] = useState(null);//Empresa
  const [userProfile, setProfileUser] = useState(null);//PCD
  const [messageRef, setMessageRef] = useState(null);//Lista de Mensagens do chat
  const [messages, setMessages] = useState([]);// Referência para a coleção de mensagens no Firestore
  const navigation = useNavigation();
  const route = useRoute();

  
 const { empresaId, userId } = route.params;

 useEffect(() => {

  const fetchData = async () => {
    try {
      await fetchEmpresaData();  
      await getPCD();            
      await getChatMessages();   
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmpresaData = async () => {
    try {
      const empresaDoc = doc(db, "Empresa", empresaId);
      const empresaSnap = await getDoc(empresaDoc);

      if (empresaSnap.exists()) {
        //console.log("Perfil da empresa encontrado:", empresaSnap.data());
        setEmpresaProfile(empresaSnap.data());
      } else {
        
        navigation.goBack()
      }
    } catch (error) {
      console.error("Erro ao buscar dados da empresa:", error);
    } finally {
      setLoading(false); // Atualiza o estado de carregamento
    }
  };

  const getPCD = async ()=>{
    const PCDdoc =doc(db, "PCD", auth.currentUser.uid)
    const GetPCDSnap = await getDoc(PCDdoc);
    if(GetPCDSnap.exists()){
     setProfileUser(GetPCDSnap.data());
    }
  }

 const getChatMessages = async ()=>{
  try{
    const ChatCollection = collection(db, "Chat");
    const GetQueryPCDId = query(ChatCollection, where("userId","==", userId));
    const GetQueryCompanyId = query(GetQueryPCDId, where("empresaId","==", empresaId)); 
    const chatSnapshot = await getDocs(GetQueryCompanyId);

    if (!chatSnapshot.empty){
      const documentosRef = chatSnapshot.docs[0]?.ref;

      if (documentosRef){
        const messagesRef = collection(documentosRef, "messages");
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'), limit(25));
        setMessageRef(messagesRef);

        const messagesSnapshot = await getDocs(messagesQuery);
        setMessages(messagesSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()})));

      }
    }
  } catch (error) {
    console.error('Erro ao buscar mensagens do Chat:', error);
  }
};


fetchData();
}, [empresaId, userId, navigation]);
const [collectionData] = useCollectionData(
  messageRef ? query(messageRef, orderBy("createdAt"), limit(25)) : null,
  { idField: "id" }
);


useEffect(() => {
  if (collectionData) {
    setMessages(collectionData); 
  }
}, [collectionData]);
if (loading) {
  return (
    <View style={load.container2}>
      <View style={load.carregando}>
        <Image
          resizeMode="contain"
          source={require('../../img/logo.png')}
          style={load.logo}
        />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={load.text}>Carregando...</Text>
      </View>
    </View>
  );
}

  return (
    <View style={{flex :1 }}>
      <ChatHeader
        onPress={() => navigation.goBack()}
        name={userData.name} 
        imageUrl={userData.imageUrl}
        empresaId={empresaId}
        />   
    <MessagesList
      messages={messages}
      empresaId={empresaId}
      userId={userId}
    />
    <ChatInputs
      messageRef={messageRef}
      userId={userId}
      userProfile={userProfile}
    />
    </View>
  )
}