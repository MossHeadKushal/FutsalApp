import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TIMES = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6; 
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour} ${ampm}`;
});

export default function CalenderScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [bookedSlots, setBookedSlots] = useState<boolean[][]>(
    Array(TIMES.length).fill(null).map(() => Array(DAYS.length).fill(false))
  );

  const toggleSlot = (rowIndex: number, colIndex: number) => {
    const isCurrentlyBooked = bookedSlots[rowIndex][colIndex];
    const day = DAYS[colIndex];
    const time = TIMES[rowIndex];

    // --- ALERT LOGIC ---
    // If it was already booked (red), it is now becoming available (green)
    if (isCurrentlyBooked) {
      Alert.alert(
        "Slot Available",
        `${day} at ${time} is now marked as Available.`
      );
    } else {
      // If it was available (green), it is now becoming booked (red)
      Alert.alert(
        "Slot Booked",
        `${day} at ${time} is now marked as Booked.`
      );
    }

    const updatedGrid = bookedSlots.map((row, rIdx) => 
      rIdx === rowIndex 
        ? row.map((col, cIdx) => (cIdx === colIndex ? !col : col))
        : row
    );
    setBookedSlots(updatedGrid);
  };

  const [loadingButton, setLoadingButton] = useState<null | 'save' | 'cancel'>(null);
  const isLoading = !!loadingButton;

  const handleSave = () => {
    setLoadingButton('save');
    setTimeout(() => {
      setLoadingButton(null);
      Alert.alert('Success', 'Availability saved successfully');
      router.back();
    }, 1000);
  }; 

  const handleCancel = () => {
    setLoadingButton('cancel');
    setTimeout(() => {
      setLoadingButton(null);
      router.back();
    }, 500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'Manage Slots', headerShown: false }} />
      
      <ScrollView className="p-3" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mt-2 mb-3">
          <Text className="text-xl font-bold text-black">Slots Available</Text>
          <View className="flex-row gap-2">
            <View className="flex-row items-center">
                <Ionicons name="shirt-sharp" size={12} color="#4ade80" />
                <Text className="text-black font-semibold text-[10px] ml-1">Available</Text>
            </View>
            <View className="flex-row items-center">
                <Ionicons name="shirt-sharp" size={12} color="#ef4444" />
                <Text className="text-black font-semibold text-[10px] ml-1">Booked</Text>
            </View>
          </View>
        </View>

        {/* --- Grid Wrapper --- */}
        <View className="bg-secondary rounded-xl p-2 shadow-sm border border-gray-100">
          
          {/* Days Header */}
          <View className="flex-row items-center mb-2">
            <View className="w-10" /> 
            {DAYS.map((day) => (
              <View key={day} className="flex-1 items-center">
                <Text className="text-[10px] font-bold text-gray-500">{day}</Text>
              </View>
            ))}
          </View>

          {/* Time Rows */}
          {TIMES.map((time, rowIndex) => (
            <View key={time} className="flex-row items-center mb-1">
              <View className="w-10 items-start">
                <Text className="text-[10px] font-bold text-gray-400">{time}</Text>
              </View>

              {DAYS.map((_, colIndex) => {
                const isBooked = bookedSlots[rowIndex][colIndex];
                return (
                  <TouchableOpacity 
                    key={colIndex} 
                    onPress={() => toggleSlot(rowIndex, colIndex)}
                    activeOpacity={0.6}
                    className="flex-1 h-10 mx-[2px] rounded-md justify-center items-center bg-gray-50 border border-gray-100"
                  >
                    <Ionicons 
                        name="shirt-sharp" 
                        size={22} 
                        color={isBooked ? "#ef4444" : "#4ade80"} 
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* --- Action Buttons --- */}
        <View className="flex-row mt-8 items-center mb-10">
          <TouchableOpacity
            className={`bg-primary flex-1 rounded-xl py-4 mr-3 items-center ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleSave}
            disabled={isLoading}
          >
            {loadingButton === 'save' ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-black text-base font-bold">Save Changes</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className={`rounded-xl py-4 px-6 border border-gray-200 ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleCancel}
            disabled={isLoading}
          >
            <Text className="text-red-500 text-base font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: insets.bottom + 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}