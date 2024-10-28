// src/toastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './style'

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.sucessoToast}>
      <Text style={styles.sucessoText}>{text1}</Text>
      <Text style={styles.sucessoSubText}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorToast}>
      <Text style={styles.errorText}>{text1}</Text>
      <Text style={styles.errorSubText}>{text2}</Text>
    </View>
  ),

   Login: ({text1, text2, props,animationType = 'fadeIn'}) => (
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
    <View style={styles.errorToastLogin}>
      <Text style={{ fontSize: 24 }}>{props.icon}</Text>
      <Text style={styles.errorTextLogin}>{text1}</Text>
      <Text style={styles.errorSubTextLogin}>{text2}</Text>
    </View>
  </Animatable.View>
   ),

   ResetSenha:({text1, text2, props,animationType = 'fadeIn'})=>(
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
      <View style={styles.EnvioToastSenha}>
        <Text style={{fontSize:24}}>{props.icon}</Text>
        <Text style={styles.EnvioTextSenha}>{text1}</Text>
      <Text style={styles.EnvioSubTextSenha}>{text2}</Text>
      </View>
    </Animatable.View>
   ),
   edicao:({text1, text2, props,animationType = 'fadeIn'})=>(
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
      <View style={styles.edicaoToast}>
        <Text style={{fontSize:24}}>{props.icon}</Text>
        <Text style={styles.edicaoText}>{text1}</Text>
      <Text style={styles.edicaoSubText}>{text2}</Text>
      </View>
    </Animatable.View>
   ),

   cadastro:({text1, text2, props,animationType = 'fadeIn'})=>(
    <Animatable.View animation={animationType} duration={500} style={styles.toastContainer}>
      <View style={styles.DocToast}>
        <Text style={{fontSize:24}}>{props.icon}</Text>
        <Text style={styles.DocText}>{text1}</Text>
      <Text style={styles.DocSubText}>{text2}</Text>
      </View>
    </Animatable.View>
   ),
};


export default toastConfig;
