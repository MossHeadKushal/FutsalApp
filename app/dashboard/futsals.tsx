import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Futsal {
  id: string;
  name: string;
  address: string;
  courts: number;
}

export default function Futsals() {
  const router = useRouter();

  // Example data
  const data: Futsal[] = [
    { id: '1', name: 'Blue Arena', address: 'Kathmandu', courts: 3 },
    { id: '2', name: 'Red Court', address: 'Lalitpur', courts: 2 },
  ];

  // Track which Futsal dropdown is open (by id)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: Futsal }) => {
    const isDropdownVisible = openDropdownId === item.id;

    return (
      <View className="flex-col px-3 py-3 bg-[#1B1B20] border-b border-white/5 rounded-lg mb-2 relative">
        {/* Row content */}
        <View className="flex-row items-center">
          <Text className="flex-1 text-gray-300">{item.name}</Text>
          <Text className="flex-1 text-gray-300">{item.address}</Text>
          <Text className="flex-1 text-gray-300">{item.courts}</Text>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); 
              setOpenDropdownId(isDropdownVisible ? null : item.id);
            }}
            className="px-2 py-1 rounded-lg ml-2 z-10"
          >
            <Ionicons name="ellipsis-vertical" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Floating dropdown menu */}
        {isDropdownVisible && (
          <Pressable
            onPress={(e) => e.stopPropagation()} 
            className="absolute top-10 right-0 w-42 bg-gray-700 rounded-lg shadow-lg z-20"
          >
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/edit', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
                className="py-2 px-2 flex-row gap-1 border-b border-gray-600"
            >
              <Ionicons name="pencil-outline" size={18} color="white" />
              <Text className="text-white font-semibold">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/courts', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
              className="py-2 px-2 flex-row gap-1 border-b border-gray-600"
            >
              <Ionicons name="football" size={18} color="white" />
              <Text className="text-white font-semibold">Courts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/calender', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
              className="py-2 px-2 flex-row gap-1 border-b border-gray-600"
            >
              <Ionicons name="calendar-outline" size={18} color="white" />
              <Text className="text-white font-semibold">Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/regularBookings', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
              className="py-2 px-2 gap-1 flex-row mt-auto border-b border-gray-600"
            >
              <Ionicons name="calendar-outline" size={18} color="white" />
              <Text className="text-white font-semibold">Regular Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                router.push({ pathname: '/edit/setting', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
            className="py-2 px-2 flex-row gap-1">
              <Ionicons name="settings-outline" size={18} color="white" />
              <Text className="text-white font-semibold">Settings</Text>
            </TouchableOpacity>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <Pressable
      className="flex-1 bg-neutral-800 px-4 py-6"
      onPress={() => setOpenDropdownId(null)} 
    >
      {/* Header */}
      <View className='w-full'>
      <View className="flex-row justify-between items-center mb-6">
        
        <Text className="text-white text-3xl font-bold">Futsals</Text>

        <TouchableOpacity
          onPress={() => router.push('/dashboard/futsalsForm')}
          className="bg-green-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-black font-semibold">New Futsals</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Search */}
      <View className="p-4 border-b border-white/5">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-3 w-full">
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9ca3af"
            className="ml-2 text-black flex-1 w-full"
          />
        </View>
      </View>

      {/* Futsals list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="flex-row px-3 py-3 bg-[#1B1B20] border-b border-white/5 w-full rounded-lg">
            <Text className="flex-1 text-gray-300 font-semibold">Name</Text>
            <Text className="flex-1 text-gray-300 font-semibold">Address</Text>
            <Text className="flex-1 text-gray-300 font-semibold">No. of Courts</Text>
            <Text className="text-gray-300 font-semibold ml-2">Action</Text>
          </View>
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="h-64 justify-center items-center">
            <View className="bg-[#1F1F25] p-4 rounded-full mb-4">
              <Ionicons name="close" size={24} color="white" />
            </View>
            <Text className="text-white text-lg">No Futsal Managers</Text>
          </View>
        }
      />
    </Pressable>
  );
}
