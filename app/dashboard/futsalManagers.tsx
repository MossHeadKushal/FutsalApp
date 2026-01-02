import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useManagers } from '../context/ManagerContext';

const ManagerCard = ({ item }) => (
  <View className="bg-white mx-4 mt-4 p-4 rounded-3xl border border-gray-100 shadow-sm">
    {/* Card Header: Name and Badges */}
    <View className="flex-row justify-between items-start mb-2">
      <Text className="text-lg font-bold text-gray-800 flex-1">{item.name}</Text>
      <View className="flex-row space-x-2">
        <View className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-gray-500 text-[10px] font-medium">{item.role}</Text>
        </View>
        <View className="bg-green-50 px-3 py-1 rounded-full">
          <Text className="text-green-500 text-[10px] font-medium">{item.status}</Text>
        </View>
      </View>
    </View>

    {/* Location Info */}
    <View className="mb-4">
      <View className="flex-row items-center mb-1">
        <MaterialCommunityIcons name="office-building" size={14} color="#6B7280" />
        <Text className="text-gray-500 ml-2 text-xs">{item.futsal}</Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons name="location-sharp" size={14} color="#6B7280" />
        <Text className="text-gray-500 ml-2 text-xs">{item.location}</Text>
      </View>
    </View>

    {/* Action Buttons */}
    <View className="flex-row justify-between items-center">
      <TouchableOpacity className="bg-[#00D04C] px-6 py-2.5 rounded-xl">
        <Text className="text-white font-bold text-sm">View Details</Text>
      </TouchableOpacity>

      <View className="flex-row space-x-3">
        <TouchableOpacity className="p-1.5 border border-gray-200 rounded-lg">
          <Ionicons name="create-outline" size={20} color="#4B5563" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#00D04C] p-2 rounded-lg">
          <Ionicons name="trash-outline" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function ManagersList() {
  const router = useRouter();
  const { managers } = useManagers();

  return (
    <View className="flex-1 bg-[#205E30]">
      <SafeAreaView className="flex-none">
        {/* Top Navigation Bar */}
        <View className="flex-row justify-between items-center px-4 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Manager's List</Text>
          <TouchableOpacity onPress={() => router.push('/dashboard/futsalManagerForm')}>
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Main Content Area */}
      <View className="flex-1 bg-[#F8FAFC] rounded-t-[35px] overflow-hidden">
        {/* Search Input */}
        <View className="px-5 pt-8 pb-2">
          <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-4 h-14 shadow-sm">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search manager"
              className="flex-1 ml-3 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <FlatList
          data={managers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ManagerCard item={item} />}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Bottom Tab Bar
        <View className="absolute bottom-0 w-full bg-white flex-row justify-around pt-3 pb-8 border-t border-gray-100">
          <TouchableOpacity className="items-center">
            <Ionicons name="basketball" size={24} color="#000" />
            <Text className="text-[11px] mt-1 text-gray-900">Home</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Ionicons name="person" size={24} color="#00D04C" />
            <Text className="text-[11px] mt-1 text-[#00D04C] font-bold">Managers</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <MaterialCommunityIcons name="soccer-field" size={24} color="#000" />
            <Text className="text-[11px] mt-1 text-gray-900">Futsals</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
            <Text className="text-[11px] mt-1 text-gray-900">More</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      </View>
    </View>
  );
}