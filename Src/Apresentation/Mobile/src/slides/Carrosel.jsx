import React, { useEffect, useState , useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image,FlatList,Animated} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import slides from './slides';
import Paginador from './Paginador';
import IntegracaoItens from './integracaoItens';
import NextButton from './NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Carrosel() {
    const navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);  
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
  
    
    const viewableItemsChanged = useRef(({ viewableItems }) => {
      setCurrentIndex(viewableItems[0].index);
    }).current;
  
   
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async()=>{
      if(currentIndex < slides.length - 1){
         slidesRef.current.scrollToIndex({index: currentIndex + 1});
      }else{
        await AsyncStorage.setItem('firstVisit', 'false');
        navigation.replace('Login');
      }
    };

    return (
      <View style={styles.container}>
      <View style={{ flex: 3 }}>
      
        <FlatList 
          data={slides}
          renderItem={({ item }) => <IntegracaoItens item={item} />} 
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}

          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginador data={slides} scrollX={scrollX}/>
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100/slides.length)}/>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})
