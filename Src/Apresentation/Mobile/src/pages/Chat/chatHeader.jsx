import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from '../../config/firebaseConfig';


export default function ChatHeader({ name, imageUrl, onPress, onlineStatu,empresaId }) {

  const navigation = useNavigation();

  const handleButtonClick = () =>{
    navigation.navigate('Perfil-Empresa', {empresaId:empresaId,  userId: auth.currentUser.uid});
}
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Icon name="angle-left" size={45} color={'#fff'} />
      </TouchableOpacity>

      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile} onPress={handleButtonClick}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1D3FAD',
    paddingTop: 50, 
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 3, 
    height:'12%'
  },
  backButton: {
    paddingHorizontal: 5,
    paddingRight:10,
  },
  profileOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 45, 
    width: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10, 
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineStatus: {
    color: '#d4d4d4',
    fontSize: 12, 
  },
  options: {
    paddingHorizontal: 10,
  },
});
