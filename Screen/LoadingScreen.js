import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Loading() {
  const navigation = useNavigation();
  setTimeout(
    (checkLoad = () => {
      navigation.navigate('Welcome');
    }),
    1000,
  );

  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: "center", backgroundColor: "#001B37"}}>
        <Image style={{height: 250, width: 250}} source={require('../Assets/Images/logo3.png')}></Image>
      </View>
    </SafeAreaView>
  );
}
