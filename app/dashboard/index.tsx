import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { assets } from '../../assets/assets';
// Define the grid items

// Define the grid items with routes
const GRID_ITEMS = [
  { id: 1, title: 'Calendar', icon: <Ionicons name="calendar" size={30} color="#0ABC36" />, route: '/edit/calender' },
  { id: 2, title: 'Regular Booking', icon: <Ionicons name="bookmarks-sharp" size={30} color="#0ABC36" />, route: '/edit/regularBookings' },
  { id: 3, title: 'Settings', icon: <Ionicons name="settings" size={30} color="#0ABC36" />, route: '/edit/setting' },
  { id: 4, title: 'Courts', icon: <Ionicons name="football" size={30} color="#0ABC36" />, route: '/edit/courts' },
];

export default function Index() {
  const router = useRouter(); // Initialize router

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F0F4F9]"
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#205E30', '#0ABC36']} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 items-center">
              {/* Top Section (Logo) */}
              <View className='h-[35vh] w-full justify-center items-center'>
                <Image source={assets.logo} className="w-[280px] h-[100px]" resizeMode="contain" />
              </View>

              {/* Bottom Partition (White Grid) */}
              <View className='flex-1 w-full bg-[#F0F4F9] pt-10 px-6 rounded-t-[40px]'>
                <View className="flex-row flex-wrap justify-between">
                  {GRID_ITEMS.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      className="w-[47%] h-[200px] aspect-square bg-white mb-5 rounded-3xl items-center justify-center shadow-sm"
                      onPress={() => router.push(item.route as any)}
                    >
                      <Text className="text-3xl mb-2">{item.icon}</Text>
                      <Text className="text-black font-semibold text-center text-lg">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}