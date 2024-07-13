import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import styles from './style'; 

export default function Documentos() {
    const navigation = useNavigation();
  
    return (
        <View style={styles.container}>
        <Text>Documentos</Text>
        </View>
    );
}
