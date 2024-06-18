import React from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
//import avatar from './path/to/your/local/avatar.jpg';

const achievements = [
  { id: '1', name: 'Name 1'},
  { id: '2', name: 'Name 2'},
  { id: '3', name: 'Name 3'},
  { id: '4', name: 'Name 4'},
  // Add more achievements as needed
];

const AchievementItem = ({ item, index }) => (
  <View style={styles.achievementContainer}>
    <Text style={styles.achievementText}>{index + 1}</Text>
    <Text style={[styles.achievementText, styles.achievementNameText]}>{item.name}</Text>
  </View>
);

const ProfileScreen = () => {
  return (
    <View style={{ height: '100%', flexDirection: 'column' }}>
      {/* White with avatar */}
      <View style={{ flex: 0.25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          //source={avatar}
          source={require('../Assets/Images/avatar_profile.png')} // Replace with your avatar URL
          style={styles.avatar}
        />
      </View>

      {/* Blue with achievement */}
      <View style={{ flex: 0.75, backgroundColor: '#086CA4', padding: 10 }}>
        <Text style={styles.nameText}>
          Your Name
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {/* username */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.smallWhiteText}>
              @username
            </Text>
          </View>

          {/* joined_date */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.smallWhiteText}>
              Joined: DD/MM/YYYY
            </Text>
          </View>
        </View>


        {/* Folowers và Follow */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
          {/* Followers */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.largeWhiteTextBold}>
              0
            </Text>
            <Text style={styles.smallWhiteText}>
              Người theo dõi
            </Text>
          </View>

          {/*Divider*/}
          <View style={{ height: '100%', width: 1, backgroundColor: '#FFFFFF', marginHorizontal: 10 }} />
          
          {/* Follow */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.largeWhiteTextBold}>
              0
            </Text>
            <Text style={styles.smallWhiteText}>
              Đang theo dõi
            </Text>
          </View>
        </View>
        
        {/* Friend Button */}
        <TouchableOpacity style={styles.friendButton}>
          <Text style={styles.friendButtonText}>Thêm bạn bè</Text>
        </TouchableOpacity>



        {/* Achievement Header */}
        <View style={styles.achievementHeader}>
          <Text style={styles.achievementHeaderText}>Thành tích</Text>
          <Text style={styles.achievementHeaderLink}>XEM TẤT CẢ</Text>
        </View>

        {/* Achievement List */}
        <FlatList
          data={achievements}
          renderItem={({ item, index }) => <AchievementItem item={item} index={index} />}
          keyExtractor={item => item.id}
          style={styles.achievementList}
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallWhiteText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  largeWhiteTextBold: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 32,
  },

  nameText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  avatar: {
    width: 200,
    height: 200,
    borderRadius: 75,
  },

  friendButton: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  friendButtonText: {
    color: '#086CA4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  achievementHeaderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievementHeaderLink: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  achievementList: {
    marginTop: 10,
  },
  achievementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  achievementText: {
    color: '#086CA4',
    fontSize: 16,
  },
  achievementNameText: {
    marginLeft: 10, // Add space between the number and the name
    flex: 1, // Ensure the name text takes up available space
  },

});

export default ProfileScreen;
