/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, 
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { UserProvider } from './Screen/UserContext';

function App() {

  return (
    <UserProvider>
    <StackNavigator />
  </UserProvider>
  )
}

const styles = StyleSheet.create({
});

export default App;
