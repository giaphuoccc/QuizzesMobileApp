import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import FriendRequest from '../components/friendRequestCompo';
import {UserContext} from './userContext';
import User from '../components/userCompo';

const FriendsScreen = ({item, friendRequest, setFriendRequests}) => {
  const {userId, users} = useContext(UserContext);
  return (
    <View style={{padding: 10, marginHorizontal: 12}}>
      {/* {friendRequest.length > 0 && <Text>Your Friend Request</Text>}
      {friendRequest.map((item, index) => (
        <FriendRequest
          userIdFromToken={userIdFromToken}
          key={index}
          item={item}
          friendRequest={friendRequest}
          setFriendRequests={setFriendRequests}
        />
      ))} */}
      {users.map((item, index) => (
        <User key={index} item={item} />
      ))}
      <Text>userId: {userId}</Text>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
