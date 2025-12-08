import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const sidebarAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.6)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -SCREEN_WIDTH * 0.6 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setIsSidebarOpen(false);
    router.back();
    alert('Logged out!');
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.dx + (isSidebarOpen ? 0 : -SCREEN_WIDTH * 0.6);
        if (newX > 0) newX = 0;
        if (newX < -SCREEN_WIDTH * 0.6) newX = -SCREEN_WIDTH * 0.6;
        sidebarAnim.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          Animated.timing(sidebarAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
          setIsSidebarOpen(true);
        } else if (gestureState.dx < -50) {
          Animated.timing(sidebarAnim, { toValue: -SCREEN_WIDTH * 0.6, duration: 200, useNativeDriver: false }).start();
          setIsSidebarOpen(false);
        } else {
          Animated.timing(sidebarAnim, { toValue: isSidebarOpen ? 0 : -SCREEN_WIDTH * 0.6, duration: 200, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <View className="flex-1 bg-white mt-6" {...panResponder.panHandlers}>
      {/* Sidebar */}
      <Animated.View
        style={{ transform: [{ translateX: sidebarAnim }] }}
        className="absolute z-10 h-full w-3/5 bg-gray-100 p-4"
      >
        <Text className="py-2 px-3 rounded-lg mt-6 text-left">Futsal Available</Text>
        <Text className="py-2 px-3 rounded-lg mt-2 text-left">Bookings</Text>
      </Animated.View>

      {/* Overlay */}
      {isSidebarOpen && (
        <TouchableOpacity
          onPress={toggleSidebar}
          className="absolute z-5 h-full w-full bg-black opacity-20"
        />
      )}

      {/* Main content */}
      <View className="flex-1 flex-row justify-between items-start p-4">
        <TouchableOpacity onPress={toggleSidebar} className="p-2 bg-gray-500 rounded-xl">
          <Ionicons
            name={isSidebarOpen ? 'menu-outline' : 'menu-sharp'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <Text className="p-4 font-semibold text-xl">Admin Dashboard</Text>

        <TouchableOpacity onPress={handleLogout} className="p-2 bg-gray-500 rounded-xl">
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
