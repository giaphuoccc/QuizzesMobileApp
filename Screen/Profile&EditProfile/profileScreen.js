import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { ProgressBar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

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
      <View style={{alignItems: 'center'}}>
          <Avatar.Image
            size={180}
            style={styles.avatar}
            source={{
              uri:userData==""||userData==null?
              
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
            :userData.image
            }}
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
              Bạn bè
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
              Thành tựu
            </Text>
          </View>
        </View>
        
        {/* Friend Button */}
        <TouchableOpacity style={styles.friendButton}>
          <Text style={styles.friendButtonText}>Chỉnh sửa thông tin cá nhân</Text>
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

  avatarContainer: {
    flex: 0.25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
