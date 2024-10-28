import React, { useRef } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { Video } from 'expo-av';
import styles from './header'; 


const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const ProfileEditHeader = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  return (
    <ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContainer}
    >
      <Animated.View style={[styles.headerTopBar, { height: headerScrollHeight }]}>
        <Text style={styles.headerTopBarText}>Página de Edição de perfil</Text>
        <View style={styles.row}>
          <Text style={styles.headerLeftBarText}>
            Complete os dados abaixo para a realização de sua edição de perfil
          </Text>
          <Video 
            source={require('../../img/Company.mp4')}
            style={styles.video}
            resizeMode='cover'
            isLooping
            shouldPlay
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ProfileEditHeader;
