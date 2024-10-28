import React, { useState, useEffect } from "react";
import{View, Text, StyleSheet,Image, Touchable, TouchableOpacity} from 'react-native'
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
export default function Welcome(){

    const Navigation = useNavigation();

    const backgroudImages =[
      require('../../img/background3.jpg'),
      require('../../img/background4.jpg'),
      require('../../img/background5.jpg'),

    ]
    const [backgroudImage, setBackgroundImage] = useState(null)

    useEffect(() => {
        const randomImage = Math.floor(Math.random() *backgroudImages.length)
        setBackgroundImage(backgroudImages[randomImage])
    },[]);

    return(
<View style={styles.container}>
            {backgroudImages&&(
            <Image 
                source={backgroudImage}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            )}
         <View style={styles.containerLogo}>
           
            </View>
            <Animatable.View  animation="fadeInUp"
            style={styles.containerForm}>
            <Animatable.Image 
            animation="fadeInLeft"
                source={require('../../img/logo.png')}
                style={styles.logo}
                resizeMode="cover"
            />
                <Text style={styles.title}>
                    A plataforma de conectividade entre empresas e pessoas com deficiência (PCD)
                </Text>
               

                <TouchableOpacity style={styles.button}
                onPress={ () => Navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Acessar DaeLink</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    containerLogo:{
     flex:2
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: -100,
    },
    logo:{
        width: 200,  
        height: 60,  
        alignSelf: 'flex-start',  
        marginLeft: 20, 
        marginTop: 20,  
    },
    containerForm: {
   flex:1,
   padding: 40,
   backgroundColor: '#fff',
   borderTopLeftRadius: 50,
   borderTopRightRadius:50,
   paddingStart:'5%',
   paddingEnd:'5%'
    },
    title: {
        fontSize:15,
        margin: 25, 
        fontWeight:'bold',
        marginTop: 28,
        marginBottom:'#111827',
    }, 
    button:{
        position:'absolute',
        backgroundColor:'#1D3FAD',
        borderRadius:50,
        paddingVertical:8,
        width:'70%',
        height: '18%',
        alignSelf:'center',
        bottom:'20%',
        alignItems:'center',
        justifyContent: 'center',
       
    },
    buttonText:{
fontSize:18,
color:'#fff',
fontWeight:'bold',
    }
    
});