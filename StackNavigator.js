import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import RankingScreen from './Screen/rankingScreen';
import GreetingScreen from './Screen/greetingScreen';
import BriefScreen from './Screen/briefScreen';
import Loading from './Screen/LoadingScreen.js';
import Welcome from './Screen/WelcomeScreen.js';
import ProfileScreen from './Screen/profile_Screen';
import HomeScreen from './Screen/homeScreen'


const StackNav = createNativeStackNavigator();

const stack = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Loading">
        <StackNav.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="GreetingScreen"
          component={GreetingScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="RankingScreen"
          component={RankingScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="BriefScreen"
          component={BriefScreen}
          options={{headerShown: false}}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default stack;

const styles = StyleSheet.create({});
