import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#4A55A2', fontSize: 35, fontWeight: 'bold'}}>
            Sign In
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
              marginTop: 15,
            }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Email
            </Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              style={{
                fontSize: 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: 400,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter Your Email"
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Password
            </Text>
            <TextInput
              //   value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={{
                // fontSize: email ? 18 : 18,
                fontSize: 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: 400,
              }}
              placeholderTextColor={'black'}
              placeholder="Password"
            />
          </View>

          <Pressable
            // onPress={handleLogin}
            style={{
              width: 250,
              backgroundColor: '#4A55A2',
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

          <Pressable
            // onPress={() => navigation.navigate('RegisterScreen')}
            style={{margin: 15}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
