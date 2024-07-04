import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import FriendRequest from '../components/friendRequestCompo';
import {UserContext} from './userContext';
import User from '../components/userCompo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LOCALHOST} from '../config';

const FriendsScreen = ({navigation}) => {
  const {userId, users} = useContext(UserContext);
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [friendSentRequest, setFriendSentRequest] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const friendsResponse = await fetch(
        `${LOCALHOST}/users/friends/${userId}`,
      );
      const friendsData = await friendsResponse.json();

      const requestsResponse = await fetch(
        `${LOCALHOST}/users/friend-requests/sent/${userId}`,
      );
      const requestsData = await requestsResponse.json();

      if (friendsResponse.ok && requestsResponse.ok) {
        setUserFriends(friendsData);
        setFriendRequests(requestsData);
        setDataLoaded(true)
      } else {
        if (!friendsResponse.ok) {
          console.log('Error retrieving user friends', friendsResponse.status);
        }
        if (!requestsResponse.ok) {
          console.log(
            'Error retrieving friend requests',
            requestsResponse.status,
          );
        }
      }
    } catch (error) {
      console.log('Error message', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);



  useEffect(() => {
    if (dataLoaded) {
      const filterUsers = () => {
        const filtered = users.filter(
          item =>
            !userFriends.includes(item._id) &&
            !friendRequests.some(friend => friend._id === item._id)
             &&
            !friendSentRequest.some(friendSent => friendSent._id === item._id),
        );
        setFilteredUsers(filtered);
      };
      filterUsers();
    }
  }, [dataLoaded, userFriends, friendRequests, friendSentRequest]);

  const handleFriendRequestSent = () => {
    console.log('Friend request sent, fetching user data again...');
    fetchUserData();
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const handleFriendRequestSentReload = () => {
    console.log('Friend request sent reload, fetching user data again...');
    fetchFriendRequests();
  };

  const fetchFriendRequests = useCallback(async () => {
    try {
      const response = await axios.get(
        `${LOCALHOST}/users/friend-request/${userId}`,
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map(friendRequest => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));
        setFriendSentRequest(friendRequestsData);
      }
    } catch (err) {
      console.log('error message', err);
    }
  });

  return (
    <View style={{backgroundColor: '#2A629A', flexDirection: 'column'}}>
      <ScrollView>
        <View
          style={{
            height: 80,
            width: '100%',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: "row"
          }}>
          <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10
          }}>
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 170,
                  height: 45,
                  backgroundColor: '#FFF',
                  borderRadius: 50,
                }}
                onPress={() => navigation.navigate('FriendSentScreen')}>
                <Text style={{color: '#2A629A', fontWeight: 'bold', fontSize: 18}}>
                  Friends
                </Text>
              </Pressable>
              <View
              style={{alignContent: "flex-end"
              }}>
              <Icon
                name="search"
                size={30}
                style={{marginHorizontal: 10}}
                color={'#FFF'}
              />
            </View>
            </View>
            
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#FFF',
            borderRadius: 15,
          }}>
          <View style={{padding: 10, marginHorizontal: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 23,
                  color: '#000',
                  fontWeight: 'bold',
                  padding: 2,
                  flex: 1,
                }}>
                Your friend request
              </Text>
              <Pressable
                onPress={() => navigation.navigate('FriendSentScreen')}>
                <Text style={{color: '#007bff', fontSize: 17}}>Xem tất cả</Text>
              </Pressable>
            </View>
            {dataLoaded ? (
              <View style={{width: '100%'}}>
                {friendSentRequest.length <= 0 && (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'gray',
                        padding: 2,
                      }}>
                      No one sent you a friend request
                    </Text>
                  </View>
                )}
                {friendSentRequest.slice(0, 5).map((item, index) => (
                  <FriendRequest
                    key={index}
                    item={item}
                    friendSentRequest={friendSentRequest}
                    setFriendSentRequest={setFriendSentRequest}
                  />
                ))}
                {friendSentRequest.length >= 2 && (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#b4b4b4',
                        padding: 7,
                        borderRadius: 8,
                      }}
                      onPress={() => navigation.navigate('FriendSentScreen')}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#007bff',
                          fontWeight: '500',
                        }}>
                        Xem Tất cả
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
          </View>
          <View>
            <Text
              style={{
                fontSize: 23,
                fontWeight: 'bold',
                color: '#000',
                marginHorizontal: 10,
                padding: 2,
              }}>
              Friend suggestion
            </Text>
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
              filteredUsers
                .slice(0, 25)
                .map((item, index) => (
                  <User
                    key={index}
                    item={item}
                    onFriendRequestSent={handleFriendRequestSent}
                  />
                ))
            )
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
