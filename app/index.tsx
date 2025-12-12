import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import './global.css';
import futsalImage from '../assets/images/futsal.jpg';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const dummyUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setTimeout(() => {

    if (email === dummyUser.email && password === dummyUser.password) {
      Alert.alert('Success', 'Login successful!');
      router.push('/dashboard');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
    setLoading(false);
  },2000);
};

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center px-6">

          <View className="justify-center items-center mt-4">
            <Image
              source={futsalImage}
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>

          <Text className="text-3xl font-bold mb-8 text-center text-black">
            Futsal Login
          </Text>

          <TextInput
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View className="w-full relative mb-6">
            <TextInput
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-3 top-3"
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

         <TouchableOpacity 
  className="w-full bg-gray-500 rounded-lg py-3 items-center"
  onPress={handleLogin}
  disabled={loading}
>
  {loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text className="text-white font-semibold text-lg">Login</Text>
  )}
</TouchableOpacity>


        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
