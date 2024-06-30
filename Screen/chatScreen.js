import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const ChatScreen = () => {
  const navigation = useNavigation();
  const imageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ556qHcNYlIMleskpIhJBp1TEiCPunv_Te45qM1S714rtDobXsgP7U0apPIqZn7GHd7gI&usqp=CAU';
  
    console.log(imageUrl);

  return (
    <View style={{backgroundColor: 'gray'}}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{width: 50, height: 50}}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
