import { View, Text, StyleSheet, Image, useWindowDimensions, item ,Platform} from 'react-native'
import React from 'react'


export default function IntegracaoItens({item}) {

const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>

      <View style={{flex:0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.description, { paddingHorizontal: width * 0.1 }]} numberOfLines={5}>
          {item.description}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
   
  },
  

  image: {
  flex:0.5,
  justifyContent: 'center',
  margin: 30,
  borderRadius:20
  },

  title:{
    fontWeight: '800',
    fontSize:Platform.OS ==='ios'? 30:22,
    marginBottom:Platform.OS ==='ios'? 10:2,
    color:'#493d8a',
    textAlign:'center'
  },
  description:{
    fontWeight:'600',
    fontSize:13,
    color:'#62656b',
    textAlign:'justify',
    flexShrink: 1,
  }
})