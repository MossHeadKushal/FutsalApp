import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

  return (
    <SafeAreaView className="flex-1 bg-[#2E7D32]">
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-white">Regular Bookings</Text>
          <View className="flex-row gap-2">
            <View className="flex-row items-center"><View className="w-2 h-2 bg-yellow-400 mr-1 rounded-full"/><Text className="text-white text-[8px]">Regular</Text></View>
            <View className="flex-row items-center"><View className="w-2 h-2 bg-red-500 mr-1 rounded-full"/><Text className="text-white text-[8px]">Booked</Text></View>
          </View>
        </View>

        {/* --- Grid Wrapper --- */}
        <View className="bg-white rounded-xl p-1 shadow-md">
          
          {/* Days Header */}
          <View className="flex-row items-center mb-2">
            <View className="w-10" /> 
            {DAYS.map((day) => (
              <View key={day} className="flex-1 items-center">
                <Text className="text-[9px] font-bold text-gray-800">{day}</Text>
              </View>
            ))}
          </View>

          {/* Time Rows (6 AM to 10 PM) */}
          {TIMES.map((time, rowIndex) => (
            <View key={time} className="flex-row items-center mb-[2px]">
              <View className="w-10 items-start pl-1">
                <Text className="text-[8px] font-bold text-gray-500">{time}</Text>
              </View>

              {DAYS.map((_, colIndex) => {
                const status = bookedSlots[rowIndex][colIndex];
                
                // Set background color based on status
                let bgColor = 'bg-[#4CAF50]'; // Default Available
                if (status === 'Regular') bgColor = 'bg-yellow-400';
                if (status === 'Booked') bgColor = 'bg-red-500';

                return (
                  <TouchableOpacity 
                    key={colIndex} 
                    onPress={() => toggleSlot(rowIndex, colIndex)}
                    activeOpacity={0.7}
                    className={`flex-1 h-10 mx-[1px] rounded-sm justify-center items-center ${bgColor}`}
                  >
                    <Text className={`text-center font-black text-[7px] ${status === 'Regular' ? 'text-black' : 'text-white'}`}>
                      {status === 'Regular' ? 'Regular' : status === 'Booked' ? 'Booked' : 'Available'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <TouchableOpacity className="mt-6 bg-black p-4 rounded-xl items-center shadow-lg mb-10">
          <Text className="text-white font-bold text-lg">Save Regular Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}