import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import FriendRequest from '../components/friendRequestCompo';
import {UserContext} from './UserContext';
import User from '../components/userCompo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LOCALHOST} from '../config';

const FriendsScreen = () => {
  const {userId, users} = useContext(UserContext);
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`${LOCALHOST}/users/friends/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log('error retrieving user friends', response.status);
        }
      } catch (error) {
        console.log('Error message', error);
      }
    };

    fetchUserFriends();
  }, [userId]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `${LOCALHOST}/users/friend-requests/sent/${userId}`,
        );
        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log('error', response.status);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchFriendRequests();
  }, [userId]);

  useEffect(() => {
    const filterUsers = () => {
      const filtered = users.filter(
        item =>
          !userFriends.includes(item._id) &&
          !friendRequests.some(friend => friend._id === item._id)
      );
      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [users, userFriends, friendRequests]);
  
  return (
    <View style={{backgroundColor: '#2A629A', flexDirection: 'column'}}>
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
      <ScrollView>
        <View
          style={{
            height: 60,
            width: '100%',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#FFF'}}>
            Friend suggestion
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#FFF',
            borderRadius: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 80,
              width: '100%',
              backgroundColor: 'pink',
              borderRadius: 15,
              alignItems: 'center',
              paddingHorizontal: 20,
              gap: 10,
            }}>
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 170,
                height: 45,
                backgroundColor: '#2A629A',
                borderRadius: 50,
              }}>
              <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 16}}>
                Friends
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 320,
                height: 45,
                backgroundColor: '#2A629A',
                borderRadius: 50,
                paddingHorizontal: 10,
              }}>
              <TextInput
                placeholder="looking for friends"
                placeholderTextColor={'#FFF'}
                style={{flex: 1}}
              />
              <Icon
                name="search"
                size={25}
                style={{marginHorizontal: 10}}
                color={'#FFF'}
              />
            </View>
          </View>
          {filteredUsers.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 18, color: 'gray'}}>
                There are currently no friend suggestions
              </Text>
            </View>
          ) : (
            filteredUsers.map((item, index) => <User key={index} item={item} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
