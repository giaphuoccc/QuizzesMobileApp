import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const LoginGreetingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#001B37',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{height: 200, width: 200, marginBottom: 20}}
          source={require('../Assets/Images/logo3.png')}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFF',
            marginBottom: 20,
          }}>
          {' '}
          SQUADEA!
        </Text>
      </View>
      <View style={{justifyContent: 'flex-end', marginBottom: 20}}>
        <TouchableOpacity
          style={{
            width: 400,
            backgroundColor: '#00ff21',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{color: '#001B37', fontSize: 25, fontWeight: 'bold'}}>
            Get started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 400,
            backgroundColor: '#001B37',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            borderWidth: 3,
            borderColor: 'gray',
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#05e221', fontSize: 25, fontWeight: 'bold'}}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginGreetingScreen;

const styles = StyleSheet.create({});
