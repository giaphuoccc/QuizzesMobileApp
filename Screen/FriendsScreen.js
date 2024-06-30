import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator
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
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const friendsResponse = await fetch(`${LOCALHOST}/users/friends/${userId}`);
        const friendsData = await friendsResponse.json();

        const requestsResponse = await fetch(`${LOCALHOST}/users/friend-requests/sent/${userId}`);
        const requestsData = await requestsResponse.json();

        if (friendsResponse.ok && requestsResponse.ok) {
          setUserFriends(friendsData);
          setFriendRequests(requestsData);
          setDataLoaded(true); 
        } else {
          if (!friendsResponse.ok) {
            console.log('Error retrieving user friends', friendsResponse.status);
          }
          if (!requestsResponse.ok) {
            console.log('Error retrieving friend requests', requestsResponse.status);
          }
        }
      } catch (error) {
        console.log('Error message', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (dataLoaded) {
      const filterUsers = () => {
        const filtered = users.filter(
          item =>
            !userFriends.includes(item._id) &&
            !friendRequests.some(friend => friend._id === item._id)
        );
        setFilteredUsers(filtered);
      };
      filterUsers();
    } 
  }, [dataLoaded]);

  
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
          {dataLoaded ? (
            filteredUsers.length === 0 ? (
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
            )
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
