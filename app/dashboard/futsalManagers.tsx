import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Manager {
  id: string;
  name: string;
  email: string;
  futsal: string;
}

export default function FutsalManagersScreen() {
  const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const data: Manager[] = [
    { id: '1', name: 'Alex Smith', email: 'alex@example.com', futsal: 'Blue Arena' },
    { id: '2', name: 'Sam Johnson', email: 'sam@example.com', futsal: 'Red Court' },
    { id: '3', name: 'Maria Garcia', email: 'maria@example.com', futsal: 'Green Turf' },
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderItem = ({ item }: { item: Manager }) => {
    const isDropdownVisible = openDropdownId === item.id;

    return (
      <View 
        style={{ zIndex: isDropdownVisible ? 100 : 1 }} 
        className="flex-col px-3 py-3 bg-secondary rounded-xl mb-3 relative"
      >
        <View className="flex-row items-center">
          <View className="flex-[2]">
             <Text className="text-black font-medium text-[12px]" numberOfLines={1}>{item.name}</Text>
          </View>
          <View className="flex-[2]">
             <Text className="text-gray-500 text-[10px]" numberOfLines={1}>{item.email}</Text>
          </View>
          <View className="flex-1 items-end">
             <Text className="text-black text-[10px] font-semibold" numberOfLines={1}>{item.futsal}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setOpenDropdownId(isDropdownVisible ? null : item.id)}
            className="ml-3 w-6 h-6 items-center justify-center"
          >
            <Ionicons name="ellipsis-vertical" size={14} color="black" />
          </TouchableOpacity>
        </View>

        {isDropdownVisible && (
          <View 
            className="absolute top-10 right-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden"
            style={Platform.select({ ios: { shadowOpacity: 0.1, shadowRadius: 10 }, android: { elevation: 5 } })}
          >
            <TouchableOpacity 
              onPress={() => { setOpenDropdownId(null); router.push({ pathname: '/edit/edit', params: { id: item.id } }); }}
              className="flex-row items-center p-3 border-b border-gray-50"
            >
              <Ionicons name="pencil-outline" size={14} color="black" />
              <Text className="ml-2 text-[11px] text-black">Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => { setOpenDropdownId(null); router.push({ pathname: '/dashboard/futsals', params: { managerId: item.id } }); }}
              className="flex-row items-center p-3 border-b border-gray-50"
            >
              <Ionicons name="football-outline" size={14} color="black" />
              <Text className="ml-2 text-[11px] text-black">Assign Futsal</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => { setOpenDropdownId(null); router.push({ pathname: '/edit/setting', params: { id: item.id } }); }}
              className="flex-row items-center p-3"
            >
              <Ionicons name="settings-outline" size={14} color="black" />
              <Text className="ml-2 text-[11px] text-black">Settings</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <Pressable className="flex-1 bg-white px-4 pt-4" onPress={() => setOpenDropdownId(null)}>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-black text-2xl font-bold tracking-tight">Futsal Managers</Text>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/futsalManagerForm')}
          className="bg-primary px-4 py-2 rounded-full"
        >
          <Text className="text-black text-[11px] font-bold">New manager</Text>
        </TouchableOpacity>
      </View>

      {/* Minimal Search */}
      <View className="flex-row bg-secondary items-center rounded-full px-3 py-2 mb-6 border-hairline">
        <Ionicons name="search-outline" size={16} color="#6b7280" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="ml-2 text-black flex-1 text-[12px]"
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="flex-row px-3 mb-2 bg-[#9bb0a5] rounded-lg py-3">
            <Text className="flex-[2] text-black font-semibold text-[9px] ">Name</Text>
            <Text className="flex-[2] text-black font-semibold text-[9px] ">Email</Text>
            <Text className="flex-1 text-black font-semibold text-right text-[9px] ">Arena</Text>
            <View className="w-9" /> 
          </View>
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-black text-[12px]">No managers found</Text>
          </View>
        }
      />
    </Pressable>
  );
}