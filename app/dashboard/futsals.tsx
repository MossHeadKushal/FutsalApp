import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image'; // Added
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useFutsals } from '../context/FutsalContext';

interface FutsalCardProps {
  item: {
    id: string;
    name: string;
    address: string;
    courts: number;
    image?: string;
    status: string;
  };
  router: any;
}

const FutsalCard = ({ item, router }: FutsalCardProps) => (
  <View className="bg-white mx-4 mt-4 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
    {/* Image Section */}
    <Image
      source={item.image ? { uri: item.image } : { uri: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2000&auto=format&fit=crop' }}
      style={{ width: '100%', height: 160 }}
      contentFit="cover"
      transition={200}
    />

    <View className="p-4">
      {/* Card Header: Name and Badges */}
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-800 flex-1">{item.name}</Text>
        <View className="flex-row space-x-2">
          <View className="bg-green-50 px-3 py-1 rounded-full">
            <Text className="text-green-500 text-[10px] font-medium">{item.status}</Text>
          </View>
        </View>
      </View>

      {/* Location Info */}
      <View className="mb-4">
        <View className="flex-row items-center mb-1">
          <Ionicons name="location-sharp" size={14} color="#6B7280" />
          <Text className="text-gray-500 ml-2 text-xs">{item.address}</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="soccer-field" size={14} color="#6B7280" />
          <Text className="text-gray-500 ml-2 text-xs">{item.courts} Courts</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          className="bg-[#00D04C] px-6 py-2.5 rounded-xl"
          onPress={() => router.push({ pathname: '/edit/calender', params: { id: item.id } })}
        >
          <Text className="text-white font-bold text-xs">View Availability</Text>
        </TouchableOpacity>

        <View className="flex-row gap-2">
          <TouchableOpacity
            className="p-2 border border-gray-200 rounded-lg"
            onPress={() => router.push({ pathname: '/edit/edit', params: { id: item.id } })}
          >
            <Ionicons name="create-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#00D04C] p-2 rounded-lg">
            <Ionicons name="trash-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default function FutsalsList() {
  const router = useRouter();
  const { futsals } = useFutsals();

  // --- Search Logic State ---
  const [searchQuery, setSearchQuery] = useState('');

  // --- Filtered Data ---
  const filteredFutsals = useMemo(() => {
    if (!searchQuery.trim()) return futsals;

    const lowerQuery = searchQuery.toLowerCase();
    return futsals.filter((futsal) =>
      futsal.name.toLowerCase().includes(lowerQuery) ||
      futsal.address.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, futsals]);

  return (
    <View className="flex-1 bg-[#205E30]">
      <SafeAreaView className="flex-none">
        {/* Top Navigation Bar */}
        <View className="flex-row justify-between items-center px-4 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Futsal's List</Text>
          <TouchableOpacity onPress={() => router.push('/dashboard/futsalsForm')}>
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
              placeholder="Search futsal by name or address"
              className="flex-1 ml-3 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={filteredFutsals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FutsalCard item={item} router={router} />}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="h-64 justify-center items-center">
              <View className="bg-gray-100 p-4 rounded-full mb-4">
                <Ionicons
                  name={searchQuery ? "search-outline" : "football-outline"}
                  size={32}
                  color="#9CA3AF"
                />
              </View>
              <Text className="text-gray-500 text-lg font-medium">
                {searchQuery ? `No results for "${searchQuery}"` : "No Futsals Found"}
              </Text>
              {searchQuery ? (
                <Text className="text-gray-400 text-sm mt-1">Try a different keyword</Text>
              ) : null}
            </View>
          }
        />
      </View>
    </View>
  );
}