import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  const [showRankingScreen, setShowRankingScreen] = useState(false);

  useEffect(() => {
    if (showRankingScreen) {
      navigation.navigate('Tabs');
    }
  }, [showRankingScreen, navigation]);

  const handleStart = () => {
    setTimeout(() => {
      setShowRankingScreen(true);
    }, 1000); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../Assets/Images/logo3.png')}
        />
        <Text style={styles.text}>Welcome to SQUADEA!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 175,
    width: 175,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    width: 300,
    backgroundColor: '#598dfa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
});
