import { View, Text, StyleSheet, TouchableOpacity , Animated} from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import {AntDesign} from '@expo/vector-icons';
import React,{useEffect,useRef} from 'react'

export default  NextButton = ({percentage, scrollTo}) =>{

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

const progressAnimation = useRef(new Animated.Value(0)).current;
const progressRef = useRef(null);

const animation = (toValue)=>{
    return Animated.timing(progressAnimation,{
        toValue,
        duration:250,
        useNativeDriver:true
    }).start()
}

useEffect(() => {
    animation(percentage);
}, [percentage]);

useEffect(() => {
    progressAnimation.addListener((value) => {
        const strokeDashoffset = circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
            progressRef.current.setNativeProps({
                strokeDashoffset,
            });
        }
    },
[percentage]
);
});

  

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
            <G rotation="-90" origin={center}>
            <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} fill="none" />
            <Circle 
                    ref={progressRef}
                    stroke="#F4338F" 
                    cx={center} 
                    cy={center} 
                    r={radius} 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    fill="none" 
                    />
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                <AntDesign name="arrowright" size={32} color="#FFFFFF"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        position:'absolute',
        backgroundColor:'#828CD9',
        borderRadius:100,
        padding:15,
    }
});
