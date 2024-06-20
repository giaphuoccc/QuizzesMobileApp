import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCALHOST } from '../config';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() =>{
    const checkLoginStatus = async() => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token){
          // nếu đã đăng nhập thì hiện màn hình chính
          navigation.navigate("HomeScreen")
          // console.log(token);
        } else{
          //token  not found
          console.log("not found token");
        }
      }catch (err){
        console.log("error", err);
      }
    }
    checkLoginStatus();
  }, [])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(`${LOCALHOST}/users/login`, user)
      .then(response => {
        // console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.navigate('HomeScreen');
        // console.log(token);
      })
      .catch(err => {
        Alert.alert('Login Error', 'Invalid email or password');
        console.log('Login Error', err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#2A629A',
      }}>
      <View style={{padding: 10}}>
        <Ionicons
          onPress={() => navigation.navigate('LoginGreeting')}
          name="chevron-back-outline"
          size={32}
          color={'#FFF'}
        />
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../Assets/Images/logo3.png')}></Image>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFF', fontSize: 35, fontWeight: 'bold'}}>
            Sign In
          </Text>
          <Text
            style={{
              color: '#FFF',
              fontSize: 17,
              fontWeight: '600',
              marginTop: 15,
            }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
                Email
              </Text>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'red'}}>
                {' '}
                *
              </Text>
            </View>
            <View
              style={{
                width: 400,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: focusedField === 'email' ? '#A8E6CF' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <Foundation
                name="mail"
                size={30}
                style={{color: focusedField === 'email' ? '#A8E6CF' : '#fff'}}
              />
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{
                  fontSize: email ? 18 : 18,
                  width: '90%',
                  paddingLeft: 10,
                  color: 'white',
                }}
                placeholderTextColor={'white'}
                placeholder="Enter your email"
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                Password
              </Text>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'red'}}>
                {' '}
                *
              </Text>
            </View>
            <View
              style={{
                width: 400,
                borderWidth: 2,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: focusedField === 'password' ? '#A8E6CF' : '#fff',
              }}>
              <FontAwesome
                name="lock"
                size={30}
                style={{
                  color: focusedField === 'password' ? '#A8E6CF' : '#fff',
                }}
              />
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry={!showPassword}
                style={{
                  fontSize: email ? 18 : 18,
                  width: '85%',
                  paddingLeft: 10,
                  color: 'white',
                }}
                placeholderTextColor={'white'}
                placeholder="Password"
              />
              <Ionicons
                name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                size={30}
                style={{
                  color: focusedField === 'password' ? '#A8E6CF' : '#fff',
                }}
                onPress={togglePasswordVisibility}
              />
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 250,
              backgroundColor: '#06b8dd',
              padding: 15,
              marginTop: 50,
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Login
            </Text>
          </Pressable>

          <View
            style={{
              margin: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
            }}>
            <Text style={{textAlign: 'center', color: '#FFF', fontSize: 16}}>
              Don't have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#00faff',
                  fontSize: 16,
                  fontStyle: 'italic',
                }}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
