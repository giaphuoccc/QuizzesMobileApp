import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from '../Screen/UserContext';
import {LOCALHOST} from '../config';
import axios from 'axios';
import base64 from 'base-64';

const User = ({item}) => {
  const {userId, users} = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const [countFriends, setCountFriends] = useState(0);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      console.log('crr:', currentUserId, 'sl', selectedUserId);
      const response = await fetch(`${LOCALHOST}/users/friend-request`, {
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

  useEffect(() => {
    if (item && item.friends) {
      setCountFriends(item.friends.length);
    }
  }, [item]);


  return (
    <View
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
        {countFriends > 0 && (
          <Text style={{color: 'gray', fontSize: 18}}>{countFriends}</Text>
        )}
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
    </View>
  );
};
export default User;
const styles = StyleSheet.create({});
