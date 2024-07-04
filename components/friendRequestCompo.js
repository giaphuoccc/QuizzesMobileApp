import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {UserType} from '../Screen/userContext';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {LOCALHOST} from '../config';

const FriendRequest = ({item, friendRequest, setFriendRequests}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const acceptRequest = async friendRequestId => {
    try {
      const response = await fetch(`${LOCALHOST}/friend-request/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: friendRequestId,
          recepientId: userIdFromToken,
        }),
      });
      if (response.ok) {
        setFriendRequests(
          friendRequest.filter(request => request._id !== friendRequestId),
        );
        navigation.navigate('Chat');
      }
    } catch (err) {
      console.log('Err accepting the friend request', err);
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        gap: 30,
        width: "100%",
        height: 120
      }}>
      <Image
        style={{width: 100, height: 100, borderRadius: 50}}
        source={{uri: item.image}}
      />
      <View style={{flexDirection: "column", flex: 1, gap: 5}}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: "black"}}>
            {item?.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 30 }}>
          <Pressable
            onPress={() => acceptRequest(item._id)}
            style={{
              backgroundColor: '#0066b2',
              width: 120,
              padding: 10,
              borderRadius: 6,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Accept
            </Text>
          </Pressable>
          <Pressable
            // onPress={() => acceptRequest(item._id)}
            style={{
              backgroundColor: 'gray',
              width: 120,
              padding: 10,
              borderRadius: 6,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
