import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RankingScreen from './Screen/rankingScreen';
import GreetingScreen from './Screen/greetingScreen';
import BriefScreen from './Screen/briefScreen';
import ProfileScreen from './Screen/profile_Screen';


const StackNav = createNativeStackNavigator();

const stack = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='ProfileScreen'>
        <StackNav.Screen name="RankingScreen" component={RankingScreen} options={{headerShown: false}} />
        <StackNav.Screen name="GreetingScreen" component={GreetingScreen} options={{headerShown: false}} />
        <StackNav.Screen name="BriefScreen" component={BriefScreen} options={{headerShown: false}} />
        <StackNav.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
      </StackNav.Navigator>
    </NavigationContainer>
  )
}

export default stack

const styles = StyleSheet.create({})