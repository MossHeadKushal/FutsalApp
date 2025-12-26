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
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === 'android' ? 'padding' : undefined}>
      <LinearGradient colors={['#0D2D15', '#205E30']} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-center px-6 h-[100%]">
            <View className='flex-row items-center justify-center mb-10'>
              <Image source={assets.futsal} className="w-24 h-24 mb-10" tintColor={"white"} />
              <Text className="text-2xl font-AbhayaLibre_ExtraBold text-light-100 mb-[-24] ml-[-14]">Smart Futsal</Text>
            </View>
            <View className='w-full relative mb-4'>
              <Text className="text-lg text-light-100 font-bold mb-2">Username</Text>
              {/* ... TextInputs remain the same ... */}
              <TextInput
                className="w-full border border-light-100 text-light-100  rounded-lg px-4 py-3 mb-4"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              {emailError && <Text className="text-red-500 text-sm mb-2">{emailError}</Text>}

              <Text className="text-lg text-light-100 font-bold mb-2">Password</Text>

              <TextInput

                className="w-full border border-light-100 text-light-100 rounded-lg px-4 py-3 pr-12"

                placeholder="Password"

                secureTextEntry={!isPasswordVisible}

                value={password}

                onChangeText={setPassword}

              />

              <TouchableOpacity

                className="absolute right-3 top-36"

                onPress={() => setIsPasswordVisible(!isPasswordVisible)}

              >

                <Ionicons

                  name={isPasswordVisible ? 'eye-off' : 'eye'}

                  size={22}

                  color="white"

                />

              </TouchableOpacity>



              {passwordError && (
                <Text className="text-red-500 text-sm mt-2">{passwordError}</Text>
              )}





              {/* 🔹 Remember Me */}

              <TouchableOpacity

                className="flex-row items-center self-start mb-6 mt-6"

                onPress={() => setRememberMe(!rememberMe)}

              >

                <Ionicons

                  name={rememberMe ? 'checkbox' : 'square-outline'}

                  size={22}

                  color="white"

                />

                <Text className="ml-2 text-light-100 font-bold">Remember Me</Text>

              </TouchableOpacity>



              <TouchableOpacity className="w-full bg-light-200 py-3 rounded-lg items-center" onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-lg font-semibold">Login</Text>}
              </TouchableOpacity>

              {/* 🔹 Biometric Button */}
              {isBiometricSupported && (
                <TouchableOpacity
                  className="mt-6 flex-row items-center justify-center"
                  onPress={handleBiometricAuth}
                >
                  <Ionicons name="finger-print" size={45} color="white" />
                  <Text className="ml-2 text-light-100 font-bold">Login with Fingerprint</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>

    </KeyboardAvoidingView >
  );
}