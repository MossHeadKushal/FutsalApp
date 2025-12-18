import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, TouchableOpacity, View } from 'react-native';
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
      useNativeDriver: true,
    }).start();
    setIsOpen(true);
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -SIDEBAR_WIDTH,
      duration: 250,
      useNativeDriver: true,
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

  // ---------- Edge swipe PanResponder ----------
  const edgePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gesture) => gesture.dx > 0,
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dx > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 0 && !isOpen) {
          const newVal = Math.min(gesture.dx - SIDEBAR_WIDTH, 0); // move sidebar
          sidebarAnim.setValue(newVal);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 50 && !isOpen) {
          openSidebar();
        } else if (!isOpen) {
          sidebarAnim.setValue(-SIDEBAR_WIDTH);
        }
      },
    })
  ).current;

  return (
    <View className="flex-1 bg-white">
      {isLoggedIn && (
        <>
          {/* Sidebar */}
          <Sidebar
            sidebarAnim={sidebarAnim}
            isOpen={isOpen}
            onClose={closeSidebar}
            onLogout={handleLogout}
            loading={loading}
          />

          {/* Header / Menu Button */}
          <View className="p-4 mt-4 bg-color bg-green-600">
            <TouchableOpacity
              onPress={isOpen ? closeSidebar : openSidebar}
              className="p-2 bg-gray-500 rounded-xl w-12"
            >
              <Ionicons name="menu-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Edge Swipe Zone */}
          {!isOpen && (
            <View
              {...edgePanResponder.panHandlers}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: 20, // edge swipe width
                zIndex: 30,
              }}
            />
          )}
        </>
      )}

      {/* Stack navigator for screens */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="dashboard/futsals" />
        <Stack.Screen name="dashboard/futsalManagers" />
        <Stack.Screen name="dashboard/futsalManagerForm" />
        <Stack.Screen name="dashboard/futsalsForm" />
        <Stack.Screen name="edit/edit" />
        <Stack.Screen name="edit/calender" />
        <Stack.Screen name="edit/courts" />
        <Stack.Screen name="edit/regularBookings" />
        <Stack.Screen name="edit/settings" />
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
