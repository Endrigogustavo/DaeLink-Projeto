// src/toastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
};


export default toastConfig;
