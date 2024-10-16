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

export default function Login() {
  const navigation = useNavigation();

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
      // Autenticação com Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Buscar o documento do usuário na coleção "PCD" no Firestore
      const userDocRef = doc(db, "PCD", uid);
      const userDoc = await getDoc(userDocRef);

      // Verificar se o usuário existe e é PCD
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.deficiencia) {
          // Se o usuário é PCD, redireciona para Home
          console.log("Usuário PCD logado:", userData);
          navigation.replace('Home');
        } else {
          // Se o usuário não é PCD, desconectar e exibir mensagem de erro
          await auth.signOut();
          
        }
      } else {
      
        await auth.signOut();
        
      }
    } catch (error) {
      // Tratar erros de autenticação
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image source={require('../../img/LogoDaeBranco.png')} 
      resizeMode='contain'//usado para redimencionar imagens
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
        secureTextEntry
        />
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
