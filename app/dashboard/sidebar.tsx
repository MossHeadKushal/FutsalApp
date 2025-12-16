import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.6;

type SidebarProps = {
  sidebarAnim: Animated.Value;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  loading: boolean;
};

export default function Sidebar({
  sidebarAnim,
  isOpen,
  onClose,
  onLogout,
  loading,
}: SidebarProps) {
  const router = useRouter();

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: sidebarAnim } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    const { translationX } = event.nativeEvent;

    if (translationX < -SIDEBAR_WIDTH / 3) {
      onClose();
    } else {
      Animated.spring(sidebarAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={onHandlerStateChange}
      >
        <Animated.View
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

          {/* Menu */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              router.push('/dashboard');
            }}
            className="flex-row items-center py-3 px-3"
          >
            <Ionicons name="person-sharp" size={20} />
            <Text className="ml-3">Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose();
              router.push('/dashboard/futsalManagers');
            }}
            className="flex-row items-center py-3 px-3"
          >
            <Ionicons name="people" size={20} />
            <Text className="ml-3">Futsal Managers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose();
              router.push('/dashboard/futsals');
            }}
            className="flex-row items-center py-3 px-3"
          >
            <Ionicons name="football" size={20} />
            <Text className="ml-3">Futsals</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            onPress={onLogout}
            disabled={loading}
            className="mt-auto bg-gray-300 p-3 rounded-lg flex-row items-center"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text className="ml-3 text-white">Logout</Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>

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
