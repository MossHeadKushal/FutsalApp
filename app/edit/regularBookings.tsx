import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// length 17 covers 6 AM to 10 PM
const TIMES = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6; 
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour} ${ampm}`;
});

// Define the possible states for a slot
type SlotStatus = 'Available' | 'Booked' | 'Regular';

export default function RegularBookingsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // State: 2D array managing the status of each slot
  const [bookedSlots, setBookedSlots] = useState<SlotStatus[][]>(
    Array(TIMES.length).fill(null).map(() => Array(DAYS.length).fill('Available'))
  );

  const toggleSlot = (rowIndex: number, colIndex: number) => {
    const currentStatus = bookedSlots[rowIndex][colIndex];
    const day = DAYS[colIndex];
    const time = TIMES[rowIndex];
    
    let nextStatus: SlotStatus;

    // Logic: Cycle through Available -> Regular -> Booked -> Available
    if (currentStatus === 'Available') {
      nextStatus = 'Regular';
      Alert.alert("Set as Regular", `${day} at ${time} is now a Regular Booking.`);
    } else if (currentStatus === 'Regular') {
      nextStatus = 'Booked';
      Alert.alert("Slot Booked", `${day} at ${time} is now fully Booked.`);
    } else {
      nextStatus = 'Available';
      Alert.alert("Slot Released", `${day} at ${time} is now Available.`);
    }

    // State Update
    const updatedGrid = bookedSlots.map((row, rIdx) => 
      rIdx === rowIndex 
        ? row.map((status, cIdx) => (cIdx === colIndex ? nextStatus : status))
        : row
    );
    setBookedSlots(updatedGrid);
  };

  // Loading and action handlers (per-button loading)
  const [loadingButton, setLoadingButton] = useState<null | 'save' | 'cancel'>(null);
  const isLoading = !!loadingButton;

  const handleSave = () => {
    setLoadingButton('save');
    const selectedCount = bookedSlots.flat().filter(s => s !== 'Available').length;
    Alert.alert(
      'Save Regular Schedule',
      `Action: Save\nSelected slots: ${selectedCount}`
    );
    setTimeout(() => {
      setLoadingButton(null);
      router.back();
    }, 1000);
  };

  const handleCancel = () => {
    setLoadingButton('cancel');
    // reset grid
    setBookedSlots(Array(TIMES.length).fill(null).map(() => Array(DAYS.length).fill('Available')));
    setTimeout(() => {
      setLoadingButton(null);
      router.back();
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView className="p-3">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-black">Regular Bookings</Text>
          <View className="flex-row gap-2">
              <View className="flex-row items-center"><View className="w-2 h-2 bg-green-400 mr-1 rounded-full"/><Text className="text-black font-semibold text-[8px]">Available</Text></View>
            <View className="flex-row items-center"><View className="w-2 h-2 bg-yellow-400 mr-1 rounded-full"/><Text className="text-black font-semibold text-[8px]">Regular</Text></View>
            <View className="flex-row items-center"><View className="w-2 h-2 bg-red-500 mr-1 rounded-full"/><Text className="text-black font-semibold text-[8px]">Booked</Text></View>
          </View>
        </View>

        {/* --- Grid Wrapper --- */}
        <View className="bg-secondary rounded-xl p-1 shadow-md">
          
          {/* Days Header */}
          <View className="flex-row items-center mb-2">
            <View className="w-10" /> 
            {DAYS.map((day) => (
              <View key={day} className="flex-1 items-center">
                <Text className="text-[9px] font-bold text-black">{day}</Text>
              </View>
            ))}
          </View>

          {/* Time Rows (6 AM to 10 PM) */}
          {TIMES.map((time, rowIndex) => (
            <View key={time} className="flex-row items-center mb-[2px]">
              <View className="w-10 items-start pl-1">
                <Text className="text-[8px] font-bold text-black">{time}</Text>
              </View>

              {DAYS.map((_, colIndex) => {
                const status = bookedSlots[rowIndex][colIndex];
                
                // Set background color based on status
                let bgColor = 'bg-primary'; // Default Available
                if (status === 'Regular') bgColor = 'bg-yellow-400';
                if (status === 'Booked') bgColor = 'bg-red-500';

                return (
                  <TouchableOpacity 
                    key={colIndex} 
                    onPress={() => toggleSlot(rowIndex, colIndex)}
                    activeOpacity={0.7}
                    className={`flex-1 h-10 mx-[1px] rounded-sm justify-center items-center ${bgColor}`}
                  >
                    <Text className={`text-secondary font-semibold text-[6px] ${status === 'Regular' ? 'text-black' : 'text-white'}`}>
                      {status === 'Regular' ? 'Regular' : status === 'Booked' ? 'Booked' : 'Available'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* --- Action Buttons --- */}
        <View className="flex-row mt-6 items-center mb-10">
          <TouchableOpacity
            className={`bg-primary rounded-lg py-3 px-5 mr-3 ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleSave}
            disabled={isLoading}
          >
            {loadingButton === 'save' ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-black text-base font-semibold">Save</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className={`rounded-lg py-3 border border-gray-400 px-5 ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleCancel}
            disabled={isLoading}
          >
            {loadingButton === 'cancel' ? (
              <ActivityIndicator size="small" color="#ef4444" />
            ) : (
              <Text className="text-red-500 text-base font-semibold">Cancel</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ height: insets.bottom + 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
}