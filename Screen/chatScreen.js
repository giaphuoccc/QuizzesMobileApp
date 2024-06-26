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
  const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgTaMmzCh0mVSg8OCx5eMEQIFKBTiLmgwxwqYWSdpyUbY7X0HzWmbPzC4x0v7QXuxkhxE&usqp=CAU';



  return (
    <View style={{backgroundColor: 'gray'}}>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
