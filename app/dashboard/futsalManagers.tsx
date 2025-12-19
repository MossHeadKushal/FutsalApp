import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FutsalManagersScreen() {
  const data: any[] = [];
  const router = useRouter();

  return (
    <View className="flex-1 bg-neutral-800 px-4 py-6">
      
      <View className="w-full">
        
        {/* Header */}
        <View className="flex justify-between items-center mb-6">
          <Text className="text-white text-3xl font-bold">
            Futsal Managers
          </Text>

</View>
<View className="flex-row justify-end mb-4">
          <TouchableOpacity 
          onPress={() => {
            router.push('/dashboard/futsalManagerForm');
          }}
          className="bg-green-500 px-4 py-2 rounded-lg">
            <Text className="text-blac font-semibold">
              New Futsal Manager
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View className="bg-neutral-800 rounded-xl border border-white/5 overflow-hidden">
          
          {/* Search Bar */}
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

          {/* Table Header */}
          <View className="flex-row px-3 py-3 bg-[#1B1B20] border-b border-white/5 w-full rounded-lg">
            <Text className="flex-1 text-gray-300 font-semibold">Name</Text>
            <Text className="flex-1 text-gray-300 font-semibold">Email</Text>
            <Text className="flex-1 text-gray-300 font-semibold">Phone</Text>
            <Text className="flex-1 text-gray-300 font-semibold">Futsal</Text>
          </View>

          {/* Empty State */}
          <View className="h-64 justify-center items-center">
            <View className="bg-[#1F1F25] p-4 rounded-full mb-4 ">
              <Ionicons name="close" size={24} color="white" />
            </View>
            <Text className="text-white text-lg">
              No Futsal Managers
            </Text>
          </View>
        </View>

      </View>
    </View>
  );
}
