import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Added
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFutsals } from '../context/FutsalContext';

export default function CreateFutsal() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [courts, setCourts] = useState<string>('');
  const [image, setImage] = useState<string>(''); // Stores local URI

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addFutsal } = useFutsals();

  // Function to pick image from mobile device
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need gallery permissions to upload photos');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = (andAnother: boolean = false) => {
    if (!name || !address || !courts) {
      Alert.alert('Error', 'Name, Address and Courts are required');
      return;
    }

    setLoading(true);

    addFutsal({
      name,
      slug,
      address,
      courts: parseInt(courts) || 0,
      image,
    });

    Alert.alert('Success', 'Futsal Created Successfully');

    setTimeout(() => {
      setLoading(false);
      if (andAnother) {
        setName('');
        setSlug('');
        setAddress('');
        setCourts('');
        setImage('');
      } else {
        router.back();
      }
    }, 500);
  };

  const handleCancel = () => {
    setLoading(true);
    setName('');
    setSlug('');
    setAddress('');
    setCourts('');
    setImage('');
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 500);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'android' ? 'padding' : undefined} >
      {/* Header Section */}
      <View className="h-[10%] bg-[#205E30]">
        <View className="flex-row items-center gap-3 p-5 mt-[12px]">
          <TouchableOpacity activeOpacity={0.7} onPress={handleCancel}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">Create New Futsal</Text>
          </View>
        </View>
      </View>

      {/* Form Content Area */}
      <View className="h-[90%] mt-4 flex-row px-4 py-4 flex-1 bg-[#F0F4F9]">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="w-full gap-6 mt-4">

            {/* Image Selection Section (Replacing Image URL TextInput) */}
            <View className="gap-2">
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Futsal Image</Text>
              <TouchableOpacity
                onPress={pickImage}
                className="w-full border border-[#5F6567] bg-white rounded-lg overflow-hidden justify-center items-center h-[120px]"
              >
                {image ? (
                  <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <View className="items-center">
                    <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                    <Text className="text-gray-400 font-medium">Click to select photo</Text>
                  </View>
                )}
              </TouchableOpacity>
              {image && (
                <TouchableOpacity onPress={() => setImage('')}>
                  <Text className="text-red-500 text-right text-xs">Clear Photo</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Futsal Name */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Futsal Name</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter futsal name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Slug */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Slug</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter futsal's slug"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                value={slug}
                onChangeText={setSlug}
              />
            </View>

            {/* Address */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Address</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter futsal's address"
                placeholderTextColor="#9CA3AF"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            {/* Number of courts */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Number of Courts</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter number of courts"
                placeholderTextColor="#9CA3AF"
                keyboardType='numeric'
                value={courts}
                onChangeText={setCourts}
              />
            </View>

            <TouchableOpacity
              className="bg-[#00D04C] py-4 rounded-xl mt-6 shadow-sm active:opacity-90 items-center justify-center"
              onPress={() => handleCreate(false)}
              disabled={loading}
            >
              <Text className="text-white text-center font-bold text-lg">Create</Text>
            </TouchableOpacity>

            <View style={{ height: insets.bottom + 70 }} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}