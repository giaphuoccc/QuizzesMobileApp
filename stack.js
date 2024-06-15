import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ranking from './Screen/rankingScreen';


function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
const StackNav = createNativeStackNavigator();

const stack = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='Ranking'>
        <StackNav.Screen name="Ranking" component={Ranking} options={{headerShown: false}} />
      </StackNav.Navigator>
    </NavigationContainer>
  )
}

export default stack

const styles = StyleSheet.create({})