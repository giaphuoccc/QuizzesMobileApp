import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import { ToastProvider } from 'react-native-toast-notifications';

import RankingScreen from './Screen/rankingScreen';
import GreetingScreen from './Screen/greetingScreen';
import BriefScreen from './Screen/briefScreen';

import Loading from './Screen/LoadingScreen.js';
import Welcome from './Screen/WelcomeScreen.js';

import Login from './Screen/loginScreen.js';
import LoginGreeting from './Screen/loginGreetingScreen.js';
import FriendsScreen from './Screen/FriendsScreen.js';

import HomeScreen from './Screen/homeScreen.js'
import RegisterScreen from './Screen/registerScreen.js';
import Chat from './Screen/chatScreen.js';

//Profile 
import ProfileScreen from './Screen/profileScreen.js';
import ProfileEditScreen from './Screen/profileEditScreen.js';

//Quiz
import PictureQuizScreen from './Screen/pictureQuizScreen.js';
import FillBlank from './Screen/fillBlankScreen.js';
import ArrangeSentence from './Screen/arrangeSentence.js';
import PairWord from './Screen/pairWordScreen.js';


import QuizHolderScreen from './Screen/quizHolderScreen';
import FriendSentScreen from './Screen/friendSentReqScreen.js';

const Tab = createBottomTabNavigator();
const StackNav = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
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
        tabBarActiveTintColor: 'green', 
        tabBarInactiveTintColor: 'gray', 
        tabBarActiveBackgroundColor: "#e0e0e0"
      }}
    >
      
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubbles" color={focused ? '#4A55A2' : 'gray'} size={32}/>
          ),
          headerShown: false,
          tabBarLabel: "Chat",
        }}
      />
      <Tab.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="people" color={focused ? '#4A55A2' : 'gray'} size={32} />
          ),
          headerShown: false,
          tabBarLabel: "Friends"
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused}) => (
            <Entypo name="home" color={focused ? '#4A55A2' : 'gray'} size={32} />
          ),
          headerShown: false,
        }}
      
      />
      <Tab.Screen
        name="RankingScreen"
        component={RankingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="bar-graph" color={focused ? '#dbdb06' : 'gray'} size={32} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
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
      <ToastProvider>
      <StackNav.Navigator initialRouteName="MyTabs" >
        <StackNav.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="QuizHolderScreen"
          component={QuizHolderScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="FillBlank"
          component={FillBlank}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="ArrangeSentence"
          component={ArrangeSentence}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="PairWord"
          component={PairWord}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="PictureQuizScreen"
          component={PictureQuizScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <StackNav.Screen 
          name="Tabs" 
          component={MyTabs} 
          options={{ headerShown: false }} />
        <StackNav.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="GreetingScreen"
          component={GreetingScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="EditProfile"
          component={ProfileEditScreen}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="Profile"
          component={ProfileScreen}
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
        <StackNav.Screen
          name="FriendSentScreen"
          component={FriendSentScreen}
          options={{headerShown: false}}
        />
        
      </StackNav.Navigator>
      </ToastProvider>
    </NavigationContainer>
  );
};

export default stack;

const styles = StyleSheet.create({});
