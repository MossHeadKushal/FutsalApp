import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { JSX, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { assets } from '../assets/images/assets';
import { useAuth } from './authContext';
import './global.css';

const STORAGE_KEY = 'REMEMBER_ME_CREDENTIALS';

export default function Login(): JSX.Element {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const dummyUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  // 🔹 Load saved credentials
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setEmail(parsed.email);
          setPassword(parsed.password);
          setRememberMe(true);
        }
      } catch (error) {
        console.log('Failed to load credentials');
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      if (email === dummyUser.email && password === dummyUser.password) {
        // 🔹 Save or clear credentials
        if (rememberMe) {
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ email, password })
          );
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }

        login();
        // Navigate to the dashboard — initialRouteName on Tabs will show its index
        router.replace('/dashboard');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center px-6">
          <Image source={assets.futsal} className="w-32 h-32 mb-6" />

          <Text className="text-3xl font-bold mb-8">Futsal Login</Text>

          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <View className="w-full relative mb-4">
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* 🔹 Remember Me */}
          <TouchableOpacity
            className="flex-row items-center self-start mb-6"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Ionicons
              name={rememberMe ? 'checkbox' : 'square-outline'}
              size={22}
              color="gray"
            />
            <Text className="ml-2 text-gray-700">Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full bg-gray-500 py-3 rounded-lg items-center"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-semibold">Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
