import React from 'react';
import { View, Image, Text } from 'react-native';

//import avatar from './path/to/your/local/avatar.jpg';

const YourComponent = () => {
  return (
    <View style={{ height: '100%', flexDirection: 'column' }}>
      {/* White with avatar */}
      <View style={{ flex: 0.25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          //source={avatar} //
          source={require('../Assets/Images/avatar_profile.png')} // Replace with your avatar URL
          style={{ width: 250, height: 200, borderRadius: 150 }} // Adjust the size as needed
        />
      </View>

      {/* Blue with achievement */}
      <View style={{ flex: 0.75, backgroundColor: '#086CA4' }}>
        <Text style={{ color: '#FFFFFF', fontSize: 72, fontWeight: 'bold', position: 'absolute', top: 10, left: 15 }}>
          Your Name
        </Text>
        <Text style={{ color: '#FFFFFF', fontSize: 72, fontWeight: 'bold', position: 'absolute', top: 10, left: 15 }}>
          @Username
        </Text>
      </View>
    </View>
  );
};

export default YourComponent;
