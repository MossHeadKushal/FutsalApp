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
      <View className="flex-col px-3 py-3 bg-secondary border-b border-white/5 rounded-lg mb-2 relative">
        {/* Row content */}
        <View className="flex-row items-center">
          <Text className="flex-1 text-black">{item.name}</Text>
          <Text className="flex-1 text-black">{item.address}</Text>
          <Text className="flex-1 text-black">{item.courts}</Text>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); 
              setOpenDropdownId(isDropdownVisible ? null : item.id);
            }}
            className="px-2 py-1 rounded-lg ml-2 z-10"
          >
            <Ionicons name="ellipsis-vertical" size={18} color="black" />
          </TouchableOpacity>
        </View>

        {/* Floating dropdown menu */}
        {isDropdownVisible && (
          <Pressable
            onPress={(e) => e.stopPropagation()} 
            className="absolute top-10 right-0 w-42 bg-[#d1f5ff] rounded-lg shadow-lg z-20"
          >
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/edit', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
                className="py-2 px-2 flex-row gap-1 border-b border-gray-300"
            >
              <Ionicons name="pencil-outline" size={18} color="black" />
              <Text className="text-black font-semibold">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/courts', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
              className="py-2 px-2 flex-row gap-1 border-b border-gray-300"
            >
              <Ionicons name="football" size={18} color="black" />
              <Text className="text-black font-semibold">Courts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/calender', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
              className="py-2 px-2 flex-row gap-1 border-b border-gray-300"
            >
              <Ionicons name="calendar-outline" size={18} color="black" />
              <Text className="text-black font-semibold">Calender</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/edit/regularBookings', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
              className="py-2 px-2 gap-1 flex-row mt-auto border-b border-gray-300"
            >
              <Ionicons name="calendar-outline" size={18} color="black" />
              <Text className="text-black font-semibold">Regular Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                router.push({ pathname: '/edit/setting', params: { id: item.id } });
                setOpenDropdownId(null);
              }}
            className="py-2 px-2 flex-row gap-1">
              <Ionicons name="settings-outline" size={18} color="black" />
              <Text className="text-black font-semibold">Settings</Text>
            </TouchableOpacity>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <Pressable
      className="flex-1 bg-white px-4 py-6"
      onPress={() => setOpenDropdownId(null)} 
    >
      {/* Header */}
      <View className='w-full'>
      <View className="flex-row justify-between items-center mb-6">
        
        <Text className="text-black text-2xl font-bold">Futsals</Text>

        <TouchableOpacity
          onPress={() => router.push('/dashboard/futsalsForm')}
          className="bg-primary px-4 py-2 rounded-full"
        >
          <Text className="text-black text-[11px] font-semibold">New Futsals</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Search */}
      
        <View className="flex-row bg-secondary border-hairline mb-4 p-2 items-center rounded-full px-2 py-2 w-full">
          <Ionicons name="search-outline" size={18} color="black" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9ca3af"
            className="ml-2 text-black semibold flex-1 w-full"
          />
        </View>
      

      {/* Futsals list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="flex-row px-3 py-3 bg-[#9bb0a5] border-b border-white/5 w-full rounded-lg mb-2">
            <Text className="flex-1 text-black font-semibold">Name</Text>
            <Text className="flex-1 text-black font-semibold">Address</Text>
            <Text className="flex-1 text-black font-semibold">No. of Courts</Text>
            <Text className="text-black font-semibold ml-2">Action</Text>
          </View>
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="h-64 justify-center items-center">
            <View className="bg-[#9bb0a5] p-4 rounded-full mb-4">
              <Ionicons name="close" size={24} color="white" />
            </View>
            <Text className="text-[#9bb0a5] text-lg">No Futsal Managers</Text>
          </View>
        }
      />
    </Pressable>
  );
}

