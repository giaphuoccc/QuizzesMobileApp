import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from '../Screen/userContext';
import {LOCALHOST} from '../config';
import axios from 'axios';
import base64 from 'base-64';
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Octicons';

const User = ({item, onFriendRequestSent, onFriendRequestSentReload}) => {
  const toast = useToast();
  const {userId, users} = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(`${LOCALHOST}/users/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({currentUserId, selectedUserId}),
      });
      if (response.ok) {
        setRequestSent(true);
        toast.show('Successfully sent a new friend request!', {
          type: 'success',
          duration: 1500,
          animationType: 'slide-in',
          placement: 'bottom', 
          offsetBottom: 500,
          icon: <Icon name='check-circle' color={"#FFF"} size={24}/>,
        });
        if (onFriendRequestSent || onFriendRequestSentReload) {
          console.log('Calling onFriendRequestSent callback...');
          onFriendRequestSent();
          onFriendRequestSentReload();
        }
      }
    } catch (err) {
      console.log('Error message', err);
    }
  };


  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1.5,
        borderColor: '#C4c4c4',
      }}>
      <View>
        <Image
          source={{
            uri: item.image,
          }}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
      </View>

      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 24}}>
          {item?.name}
        </Text>
      </View>

      <View style={{flexDirection: 'row', gap: 10}}>
        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: '#2A629A',
            padding: 10,
            borderRadius: 7,
            width: 125,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Add Friend
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};
export default User;
const styles = StyleSheet.create({});
