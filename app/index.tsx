import * as LocalAuthentication from 'expo-local-authentication'; // 1. Import library
import { useRouter } from 'expo-router';
// ... keep other imports
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';


import React, { JSX, useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { assets } from '../assets/assets';

import { useAuth } from './authContext';

import './global.css';

const STORAGE_KEY = 'REMEMBER_ME_CREDENTIALS';

export default function Login(): JSX.Element {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);

  // 🔹 Check for Biometric support and Load saved credentials
  useEffect(() => {
    const prepareLogin = async () => {
      // Check hardware support
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(compatible && enrolled);

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

    prepareLogin();
  }, []);

  // 🔹 Biometric Authentication Logic
  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Use Password',
      disableDeviceFallback: false,
    });

    if (result.success) {
      // If biometric is successful and we have saved credentials, log in
      if (email && password) {
        handleLogin();
      } else {
        Alert.alert('Setup Required', 'Please login manually once to enable biometrics.');
      }
    }
  };

  const handleLogin = async () => {
    setEmailError(null);
    setPasswordError(null);

    let isValid = true;
    if (!email) {
      setEmailError('Please enter email');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Please enter password');
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // Mock API Call
    setTimeout(async () => {
      if (email === 'user@example.com' && password === 'password123') {
        if (rememberMe) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ email, password }));
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
        login();
        router.replace('/dashboard');
      } else {
        // Simple mock validation logic
        if (email !== 'user@example.com') {
          setEmailError('Invalid email');
        } else {
          setPasswordError('Invalid password');
        }
      }
      setLoading(false);
    }, 2000);
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-[#F0F4F9]" behavior={Platform.OS === 'android' ? 'padding' : undefined} >
      <LinearGradient colors={['#205E30', '#0ABC36']} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 items-center h-full min-h-screen">
              <View className='h-[35%] w-full'>
                <View className='gap-[26px] px-[31px] py-[107px] mt-[90px]'>
                  <Image source={assets.logo} className="w-[280px] h-[100px] " />
                </View>
              </View>

              <View className='h-[65%] w-full bg-[#F0F4F9] pt-10 px-4 rounded-t-3xl'>
                <View className='w-full gap-6 p-[12px]'>
                  {/* Username Group */}
                  <Text className='text-2xl text-dark-100 font-bold opacity-100 mb-[16px]'>Log In to your Account</Text>
                  <View className='gap-4'>
                    <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Username</Text>
                    <TextInput
                      className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                      placeholder="Enter your mobile number"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                    />
                    {emailError && <Text className="text-red-500 text-sm">{emailError}</Text>}
                  </View>

                  {/* Password Group */}
                  <View className='gap-4'>
                    <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Password</Text>
                    <View className="relative w-full">
                      <TextInput
                        className="w-full border border-[#5F6567] text-dark-100 font-semibold text-[16px] rounded-lg px-4 py-3 pr-12 h-[50px]"
                        placeholder="Enter your password"
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity
                        className="absolute right-4 top-3.5"
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        <Ionicons
                          name={isPasswordVisible ? 'eye-off' : 'eye'}
                          size={22}
                          color="#5F6567"
                        />
                      </TouchableOpacity>
                    </View>
                    {passwordError && <Text className="text-red-500 text-sm">{passwordError}</Text>}
                  </View>

                  {/* Remember Me */}
                  <View className="gap-6">
                    <TouchableOpacity
                      className="flex-row items-center self-start"
                      onPress={() => setRememberMe(!rememberMe)}
                    >
                      <Ionicons
                        name={rememberMe ? 'checkbox' : 'square-outline'}
                        size={22}
                        color="#5F6567"
                      />
                      <Text className="ml-2 text-dark-100 font-small">Remember Me</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Login Button */}
                  <View className="gap-4">
                    <TouchableOpacity className="w-full bg-light-200 h-14 rounded-lg items-center justify-center mt-2" onPress={handleLogin} disabled={loading}>
                      {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg font-semibold">Login</Text>}
                    </TouchableOpacity>
                  </View>

                  {/* Biometric Button */}
                  <View className="gap-4">
                    {isBiometricSupported && (
                      <TouchableOpacity
                        className="flex-col items-center justify-center"
                        onPress={handleBiometricAuth}
                      >
                        <Ionicons name="finger-print" size={45} color="#5F6567" />
                        <Text className="mt-2 text-dark-100 font-bold">Login with Fingerprint</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

      </LinearGradient>
    </KeyboardAvoidingView >
  );
}