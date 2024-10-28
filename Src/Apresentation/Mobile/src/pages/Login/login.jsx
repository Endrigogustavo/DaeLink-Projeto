import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

import { auth,db } from '../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'; 
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Animatable from 'react-native-animatable'
import Toast from 'react-native-toast-message';
import { FontAwesome, Ionicons , Feather} from '@expo/vector-icons';

import { Input, Block } from 'galio-framework';


export default function Login() {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true)
const schema = yup.object({
  email:yup.string().email("Email Invalido").required("Informe seu email"),
  password:yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
})

  const {control, handleSubmit, formState: { errors}} = useForm({
       resolver: yupResolver(schema)
  })

  useEffect(() => {
    const checkFirstVisit = async () => {
      const firstVisit = await AsyncStorage.getItem('firstVisit');
      if (!firstVisit) {
        navigation.replace('Carrosel'); // redireciona para o carrossel se for a primeira visita
      } else {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace('Home');
          }
        });
        return unsubscribe;
      }
    };

    checkFirstVisit();
  }, [navigation]);

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userDocRef = doc(db, "PCD", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.deficiencia) {
         
          console.log("Usuário PCD logado:", userData);
          navigation.replace('Home');
        } else {
          await auth.signOut();
        }
      } else {
        await auth.signOut();
        
      }
    } catch  {
      Toast.show({
        type: 'Login',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Desculpe não foi encontrado esse email ou senha invalida.',
        position: 'top',
        props: { icon: '❗'}
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image source={require('../../img/logo.png')} 
      resizeMode='contain'
      animation="flipInY"
      style={styles.logo} />

      <Animatable.View delay={600} animation="fadeInLeft" style={styles.containerForm}>
      <Animatable.Text animation='fadeInUp' style={styles.title}>Login</Animatable.Text>

      <Controller
      control={control}
      name="email"
      render={({field:{onChange,onBlur,value}})=>(
        <Animatable.View
        animation="fadeInLeft">
        <TextInput
        style={[styles.input, {
          borderWidth:errors.email && 1, 
          borderColor:errors.email &&'#ff375b'
        }]}
        
        placeholder="Email"
        placeholderTextColor='#111827'
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}//chamado  quando o textinput é tocado.
        keyboardType="email-address"
        autoCapitalize="none"
        />
    </Animatable.View>
  )}
/>
       {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

<Controller
      control={control}
      name="password"
      render={({field:{onChange,onBlur,value}})=>(
        <Animatable.View
        animation='fadeInLeft'>
        <View style={styles.inputArea}>
          
<TextInput
        style={[styles.input, {
          borderWidth:errors.password && 1,
          borderColor:errors.password &&'#ff375b'
        }]}
        placeholder="Senha"
        placeholderTextColor='#111827'
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        secureTextEntry={hidePass}
        />
        <TouchableOpacity style={styles.icon} onPress={()=>setHidePass(!hidePass)} //o Exclamação funciona como um negador no caso eu estou utilizando para trocar o valor do true para false
        >
        
        {hidePass?
          <Ionicons name="eye" size={28} color="#1D3FAD" />
          :
          <Ionicons name="eye-off" size={28} color="#1D3FAD" />
        }
        </TouchableOpacity>
        </View>
    </Animatable.View>
  )}
/>

      {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

      
      <TouchableOpacity style={styles.button} onPress={handleSubmit (handleLogin)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
