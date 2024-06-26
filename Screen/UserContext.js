import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';
import { LOCALHOST } from '../config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const encodedPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
        const userIdFromToken = decodedPayload.userId;
        const response = await axios.get(`${LOCALHOST}/users/${userIdFromToken}`);
        setUsers(response.data);
        setUserId(userIdFromToken);
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userId, users, loading }}>
      {children}
    </UserContext.Provider>
  );
};
