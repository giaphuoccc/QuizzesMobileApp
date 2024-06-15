import React from 'react';
import { View, Image, Text } from 'react-native';
//import avatar from './path/to/your/local/avatar.jpg';

const ProfileScreen = () => {
  return (
    <View style={{ height: '100%', flexDirection: 'column' }}>
      {/* White with avatar */}
      <View style={{ flex: 0.25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          //source={avatar}
          source={require('../Assets/Images/avatar_profile.png')} // Replace with your avatar URL
          style={{ width: 150, height: 150, borderRadius: 75 }}
        />
      </View>

      {/* Blue with achievement */}
      <View style={{ flex: 0.75, backgroundColor: '#086CA4', padding: 10 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold'}}>
          Your Name
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {/* Phần tử thứ nhất */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
              @username
            </Text>
          </View>

          {/* Phần tử thứ hai */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
              Joined: DD/MM/YYYY
            </Text>
          </View>
        </View>


        {/* Folowers và Follow */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
          {/* Followers */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 32 }}>
              0
            </Text>
            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
              Người theo dõi
            </Text>
          </View>

          <View style={{ height: '100%', width: 1, backgroundColor: '#FFFFFF', marginHorizontal: 10 }} />
          
          {/* Follow */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 32 }}>
              0
            </Text>
            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
              Đang theo dõi
            </Text>
          </View>
        </View>
        
        
      </View>
    </View>
  );
};

export default ProfileScreen;
