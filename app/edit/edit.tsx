import { useRouter } from 'expo-router';
import React, { useState, } from 'react';
import { ActivityIndicator, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define a type for our loading states
type LoadingState = 'save' | 'cancel' | null;

export default function Edit() {
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<LoadingState>(null);
  const router = useRouter();


  const handleCreate = () => {
     setLoading('save');
    // Simulate form submission
   // alert(`Action: ${andAnother ? 'Create & Create Another' : 'Create'}\nName: ${name}\nSlug: ${slug}\nAddress: ${address}`);
    // Add logic for API call here
    setTimeout(() => {
          // navigate back after a short delay
          setLoading(null);
          router.back();
        }, 1000);
  }


  const handleCancel = () => {
      setLoading('cancel');
      setName('');
      setSlug('');
      setAddress('');
      
        setTimeout(() => {
          // navigate back after a short delay
          setLoading(null);
          router.back();
        }, 1000);
    };

  return (
    <View className="flex-1 bg-white">
      <View className="p-5 flex-1">
        {/* Title */}
        <Text className="text-2xl font-bold text-black mb-8">
          Edit Futsal
        </Text>

        {/* Form */}
        <View className="">
          {/* Name */}
          <View>
            <Text className="text-sm font-semibold text-black mb-1">Name</Text>
            <TextInput
              className="bg-secondary rounded-lg h-12 px-4 text-white"
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Slug */}
          <View>
            <Text className="text-sm font-semibold text-black mt-1 mb-1">Slug *</Text>
            <TextInput
              className="bg-secondary rounded-lg h-12 px-4 text-white"
              value={slug}
              onChangeText={setSlug}
              placeholder="Enter unique slug"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Address */}
          <View>
            <Text className="text-sm font-semibold text-black mt-1 mb-1">Address *</Text>
            <TextInput
              className="bg-secondary rounded-lg h-12 px-4 text-white"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              placeholderTextColor="#A0A0A0"
            />
          </View>

          {/* Active Switch */}
          <View className="flex-row items-center justify-end mt-4">
            <Text className="text-base text-black font-semibold">
              {active ? 'Active' : 'Inactive'}
            </Text>

            <Switch
              value={active}
              onValueChange={setActive}
              trackColor={{ false: '#525252', true: '#00c187' }}
              thumbColor={active ? '#00c187' : '#f9fafb'}
            />
          </View>
          
          {/* --- Action Buttons --- */}
          <View className="flex-row mt-6 items-center">
            
            {/* Create Button */}
            <TouchableOpacity
              className={`bg-green-500 rounded-lg py-3 px-8 mr-3 flex-row items-center justify-center ${loading ? 'opacity-50' : ''}`}
              onPress={handleCreate}
              disabled={loading !== null}
            >
              {loading === 'save' ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-black text-base font-semibold">Save</Text>
              )}
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              className={`rounded-lg py-3 border border-gray-400 px-8 flex-row items-center justify-center ${loading ? 'opacity-50' : ''}`}
              onPress={handleCancel}
              disabled={loading !== null}
            >
              {loading === 'cancel' ? (
                <ActivityIndicator size="small" color="#ef4444" />
              ) : (
                <Text className="text-red-500 text-base font-semibold">Cancel</Text>
              )}
            </TouchableOpacity>
            </View>
              </View>
      </View>
            
    </View>
  );
}
