import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import RankingScreen from './Screen/rankingScreen';
import GreetingScreen from './Screen/greetingScreen';
import BriefScreen from './Screen/briefScreen';
import Loading from './Screen/LoadingScreen.js';
import Welcome from './Screen/welcomeScreen.js';
import ProfileScreen from './Screen/profile_Screen';
import Login from './Screen/loginScreen.js';
import LoginGreeting from './Screen/loginGreetingScreen.js';
import FriendsScreen from './Screen/friendsScreen.js';
import HomeScreen from './Screen/homeScreen'



const Tab = createBottomTabNavigator();
const StackNav = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false, 
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#4A55A2', 
        tabBarInactiveTintColor: 'gray', 
      }}
    >
      
      <Tab.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubbles" color={focused ? '#4A55A2' : 'gray'} size={32} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={BriefScreen}
        options={{
          tabBarIcon: ({ focused}) => (
            <Entypo name="home" color={focused ? '#4A55A2' : 'gray'} size={32} />
          ),
          headerShown: false,
        }}
      
      />
      <Tab.Screen
        name="LoginGreeting"
        component={LoginGreeting}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="shield" color={focused ? '#4A55A2' : 'gray'} size={32} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const stack = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Tabs">
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
        <StackNav.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
        <StackNav.Screen
          name="Login"
          component={Login}
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
