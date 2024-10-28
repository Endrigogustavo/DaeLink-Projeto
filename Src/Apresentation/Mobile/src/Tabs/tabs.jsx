import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home/home';
import Perfil from '../pages/Perfil/perfil';
import Vagas from '../pages/Vaga/Visualizar-Vaga/vagas';
import Processo from '../pages/Vaga/Processos/visualizar_Processos';

import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ImageBackground, StyleSheet,Platform  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons , Feather,Foundation} from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AnimatedIcon =({name,color,size,focused,iconLibrary: IconComponent})=>{
  const scale= useSharedValue(focused? 1.2:1);


const animatedStyle=useAnimatedStyle(()=>{
  return{
    transform:[{scale:withTiming(scale.value, { duration: 300 }) }],
  };
});

return(
  <Animated.View style={animatedStyle}>
    <IconComponent name={name} color={color} size={size}/>
  </Animated.View>
);
};

export default function MyTabs(){
  return (
    <Tab.Navigator screenOptions={{ 
       tabBarActiveTintColor: '#1D3FAD', 
        tabBarInactiveTintColor: '#95a5a6', 
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle:styles.tabBarLabel,
        tabBarItemStyle:styles.tabBarItem,
      }} 
     >
    <Tab.Screen 
      name="HomeTab" 
      component={Home} 
      options={{
                 headerShown:false,
                  title: "Home",
                  tabBarIcon: ({ focused, color }) => (
            <AnimatedIcon
              name="home"
              color={color}
              size={30}
              focused={focused}
              iconLibrary={focused ? Foundation : Feather}
            />
          ),
        }}
      />
                   
    <Tab.Screen
    name='Vaga'
    component={Vagas}
    options={{
      headerShown:false,
      tabBarIcon:({focused,color}) =>(
            <AnimatedIcon
              name={'work'}
              color={color}
              size={30}
              focused={focused}
              iconLibrary={ MaterialIcons}
            />
          ),
        }}
      />
    <Tab.Screen
        name="Perfil" 
        component={Perfil} 
        options={{
          headerShown: true,
          tabBarIcon:({focused,color}) =>(
            <AnimatedIcon
              name="user"
              color={color}
              size={30}
              focused={focused}
              iconLibrary={focused ? FontAwesome : Feather}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Processo" 
        component={Processo} 
        options={{
          headerShown: true,
          tabBarIcon:({focused,color}) =>(
            <AnimatedIcon
              name="loader"
              color={color}
              size={30}
              focused={focused}
              iconLibrary={Feather}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
tabBar: {
  height: 70,
  width:'100%',
  position: 'absolute',

  backgroundColor: '#ffffff',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.12,
  shadowRadius: 5,
  elevation: 5, 
  borderWidth: 3,
  borderColor: '#1D3FAD',
  paddingBottom: Platform.OS === 'ios' ? 10 : 5,
},
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
});