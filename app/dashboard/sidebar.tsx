import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.6;

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  loading: boolean;
};

export default function Sidebar({
  isOpen,
  onClose,
  onLogout,
  loading,
}: SidebarProps) {
  const router = useRouter();
  const sidebarAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  // Animate open/close 
  useEffect(() => {
    Animated.spring(sidebarAnim, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // PanResponder for swipe
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 5,

      onPanResponderMove: (_, gesture) => {
        // Only allow dragging left
        if (gesture.dx < 0) {
          const newVal = Math.max(gesture.dx, -SIDEBAR_WIDTH);
          sidebarAnim.setValue(newVal);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -SIDEBAR_WIDTH / 3) {
          onClose(); 
        } else {
          Animated.spring(sidebarAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <>
      {/* Sidebar */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: sidebarAnim }],
          width: SIDEBAR_WIDTH,
        }}
        className="absolute z-20 h-full bg-gray-100 p-4"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mt-6 mb-6">
          <Text className="text-lg font-bold">Admin Panel</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-outline" size={24} />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push('/dashboard');
          }}
          className="flex-row items-center py-3 px-3 rounded-lg"
        >
          <Ionicons name="person-sharp" size={20} />
          <Text className="ml-3 text-base">Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push('/dashboard/futsalManagers');
          }}
          className="flex-row items-center py-3 px-3 rounded-lg"
        >
          <Ionicons name="people" size={20} />
          <Text className="ml-3 text-base">Futsal Managers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push('/dashboard/futsals');
          }}
          className="flex-row items-center py-3 px-3 rounded-lg"
        >
          <Ionicons name="football" size={20} />
          <Text className="ml-3 text-base">Futsals</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          onPress={onLogout}
          disabled={loading}
          className="mt-auto flex-row items-center mb-8 py-3 px-3 rounded-lg bg-gray-300"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text className="ml-3 text-white font-semibold">Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Overlay */}
      {isOpen && (
        <TouchableOpacity
          onPress={onClose}
          className="absolute z-10 h-full w-full bg-black/30"
        />
      )}
    </>
  );
} 