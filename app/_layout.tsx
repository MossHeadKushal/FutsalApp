import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { AuthProvider, useAuth } from './authContext';
import Sidebar from './dashboard/sidebar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.6;

function AppLayout() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const sidebarAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setIsOpen(true);
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -SIDEBAR_WIDTH,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setIsOpen(false);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      closeSidebar();
      logout();
      setLoading(false);
      router.replace('/');
    }, 1500);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Sidebar + Header ONLY if logged in */}
      {isLoggedIn && (
        <>
          <Sidebar
            sidebarAnim={sidebarAnim}
            isOpen={isOpen}
            onClose={closeSidebar}
            onLogout={handleLogout}
            loading={loading}
          />

          <View className="p-4 mt-4">
            <TouchableOpacity
              onPress={isOpen ? closeSidebar : openSidebar}
              className="p-2 bg-gray-500 rounded-xl w-12"
            >
              <Ionicons name="menu-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="dashboard/futsals" />
        <Stack.Screen name="dashboard/futsalManagers" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
