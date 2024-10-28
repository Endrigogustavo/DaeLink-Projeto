import { View, Text, StyleSheet,TouchableOpacity, TextInput, Platform  } from 'react-native'
import React, {useState} from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { addDoc, collection, orderBy, query, where, serverTimestamp, limit, getDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { Input, Block } from 'galio-framework';


export default function ChatInputs({messageRef, userId, userProfile}) {

  const [formValue, setFormValue] = useState("");

const CreateMessagem = async ()=>{
  if (formValue.trim() === "") {
    return; 
  }
  if(messageRef && userProfile ){
    const uid = userId;
    const pcdId = userProfile; 
    
    try{
      await addDoc(messageRef,{
        text: formValue,
        uid,
        pcdId:uid,
        createdAt: serverTimestamp(),
      });
      setFormValue("");
    }catch(error){
      console.error("erro no:",error);
  }
}};
  const [message, setMessage] = useState('')
  return (
    <View style={styles.container}>

        <Input
         style={{ borderColor: "blue", borderRadius: 22, width:'125%', marginLeft:10 }}
            bottomHelp
            placeholderTextColor="#4F8EC9"
            value={formValue}
            onChangeText={(text) => setFormValue(text)}
        />

          <TouchableOpacity 
            style={styles.sendButton}
            onPress={CreateMessagem}
>
          <Icon name={message ? "send":"send"} size={23} color={'#f9f9f9'}/>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 35,
    flex: 1,
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor:'#0000ff',
    borderRadius: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    color: '#000',
    fontSize: 16,
    height: 40,
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  emoticonButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  sendButton: {
    backgroundColor: '#0000ff',
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});