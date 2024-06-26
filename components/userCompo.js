import {StyleSheet, Text, View, Pressable, Image, ImageBackground} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from '../Screen/userContext';
import {LOCALHOST} from '../config';
import axios from 'axios';
import base64 from 'base-64';
import { Avatar } from 'react-native-paper';

const User = ({item}) => {
  const {userId, users} = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const image = 'https://legacy.reactjs.org/logo-og.png';


  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      console.log('crr:', currentUserId, 'sl', selectedUserId);
      const response = await fetch(`${LOCALHOST}/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({currentUserId, selectedUserId}),
      });
      if (response.ok) {
        setRequestSent(true);
      }
    } catch (err) {
      console.log('error message', err);
    }
  };


  return (
    <Pressable style={{alignItems: 'center', marginVertical: 10}}>
      <View style={{borderWidth: 3, borderColor: 'red'}}>
        <Avatar.Image size={100} source={{uri: image}} />
      </View>

      <View style={{marginLeft: 12, flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
        <Text style={{marginTop: 4, color: 'gray'}}>{item?.email}</Text>
      </View>

      <Pressable
        onPress={() => sendFriendRequest(userId, item._id)}
        style={{
          backgroundColor: '#567189',
          padding: 10,
          borderRadius: 6,
          width: 105,
        }}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
          Add Friend
        </Text>
      </Pressable>
    </Pressable>
  );
};
export default User;
const styles = StyleSheet.create({});
