import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation, useRoute} from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <Pressable>
      {/* components */}
      {/* { acceptedFriends.map((item, index) => (
        <UserChat key={index} item={item} userIdFromToken={userIdFromToken}/>
      ))} */}
    </Pressable>
  </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})