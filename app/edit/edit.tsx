import { useRouter } from 'expo-router';
import React, { useState, } from 'react';
import { StatusBar, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Edit() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [address, setAddress] = useState('');
  const [active, setActive] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View className="p-5 flex-1">
        {/* Title */}
        <Text className="text-2xl font-bold text-white mb-8">
          Edit Futsal
        </Text>

        {/* Form */}
        <View className="space-y-4">
          {/* Name */}
          <View>
            <Text className="text-sm text-gray-200 mb-1">Name</Text>
            <TextInput
              className="bg-neutral-800 rounded-lg h-12 px-4 text-white"
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Slug */}
          <View>
            <Text className="text-sm text-gray-200 mb-1">Slug *</Text>
            <TextInput
              className="bg-neutral-800 rounded-lg h-12 px-4 text-white"
              value={slug}
              onChangeText={setSlug}
              placeholder="Enter unique slug"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Address */}
          <View>
            <Text className="text-sm text-gray-200 mb-1">Address *</Text>
            <TextInput
              className="bg-neutral-800 rounded-lg h-12 px-4 text-white"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Active Switch */}
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-base text-gray-200">
              {active ? 'Active' : 'Inactive'}
            </Text>

            <Switch
              value={active}
              onValueChange={setActive}
              trackColor={{ false: '#525252', true: '#22c55e' }}
              thumbColor={active ? '#16a34a' : '#f9fafb'}
            />
          </View>
          <View className="flex-row mb-5 mt-6 items-center">
              <TouchableOpacity
               onPress={() => {
                router.push({ pathname: '/dashboard/futsals'})
              }}
                className="bg-green-600 rounded-lg py-3 px-5 mr-3"
              >
                <Text className="text-white text-base font-semibold">Save Changes</Text>
              </TouchableOpacity>
      
              <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/dashboard/futsals'})
              }}
                className="rounded-lg py-3 px-5"
              >
                <Text className="text-gray-500 text-base">Cancel</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
            
    </View>
  );
}
