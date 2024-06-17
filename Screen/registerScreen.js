import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

const RegisteeScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    } else if (!email.endsWith('@gmail.com')) {
      Alert.alert('Error', 'Email must end with @gmail.com');
      return;
    } else if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    axios
      .post('http://192.168.100.3:8000/api/users/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'You have been registered Successfully!',
        );
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering',
        );
        console.log('Registration failed', error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#2A629A'}}>
      <View style={{padding: 10}}>
        <Ionicons
          onPress={() => navigation.goBack()}
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
            Register
          </Text>
          <Text
            style={{
              color: '#FFF',
              fontSize: 17,
              fontWeight: '600',
              marginTop: 15,
            }}>
            Register To Your Account
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
                Name
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
                borderColor: focusedField === 'name' ? '#01ff01' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <FontAwesome
                name="user"
                size={30}
                style={{color: focusedField === 'name' ? '#01ff01' : '#fff'}}
              />
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={{
                  fontSize: email ? 18 : 18,
                  width: '90%',
                  color: 'white',
                  paddingLeft: 10
                }}
                placeholderTextColor={'white'}
                placeholder="Enter your name"
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
                Email
              </Text>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'red'}}>
                {' '}
                *
              </Text>
            </View>
            <View style={{width: 400,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: focusedField === 'email' ? '#01ff01' : '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,}}>
              <Foundation name='mail' size={30} style={{color: focusedField === 'email' ? '#01ff01' : '#fff'}}/> 
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{
                  fontSize: email ? 18 : 18,
                  width: "90%",
                  paddingLeft: 10,
                  color: "white"
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
                borderColor: focusedField === 'password' ? '#01ff01' : '#fff',
              }}>
              <FontAwesome name="lock" size={30} style={{color: focusedField === 'password' ? '#01ff01' : '#fff'}} />
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
                  color: "white"
                }}
                placeholderTextColor={'white'}
                placeholder="Password"
              />
              <Ionicons
                name={showPassword ? 'eye-sharp' : 'eye-off-sharp'}
                size={30}
                color={'white'}
                onPress={togglePasswordVisibility}
              />
            </View>
          </View>
          <Pressable
            onPress={handleRegister}
            style={{
              width: 250,
              backgroundColor: '#06b8dd',
              padding: 15,
              marginTop: 20,
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Register
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
            <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
              Already have an account?
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#00faff',
                  fontSize: 18,
                  fontStyle: 'italic',
                  fontWeight: "bold",

                }}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisteeScreen;

const styles = StyleSheet.create({});
