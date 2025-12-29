import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateManager() {

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [futsal, setFutsal] = useState<string>('');
  const router = useRouter();

  const handleCancel = () => {
    setLoading(true);
    setName('');
    setEmail('');
    setPhone('');
    setFutsal('');
    //Alert.alert('Action', 'Form cancelled and cleared.');
    setTimeout(() => {
      // navigate back after a short delay
      setLoading(false);
      router.back();
    }, 1000);
  };



  return (


    <View className="flex-1 bg-[#205E30]">
      {/* Header Section */}
      <View className="h-[15%] flex-row items-center px-4 py-4">
        <TouchableOpacity activeOpacity={0.7}
          onPress={handleCancel}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-white text-xl font-bold">Create Futsal Manager</Text>
        </View>
      </View>

      {/* Form Content Area */}
      <View className="h-[85%] mt-4 flex-row px-4 py-4 flex-1 bg-[#F0F4F9] rounded-t-3xl">
        <ScrollView
          className="px-2"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full gap-6 mt-4">

            {/* Manager Name */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Manager Name</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter manager name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Email Address */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Email Address</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter manager's email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone Number */}
            <View className='gap-2'>
              <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Phone Number</Text>
              <TextInput
                className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                placeholder="Enter manager's phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            {/* Futsal Name (Select) */}
            <TouchableOpacity activeOpacity={0.8}>
              <View className='gap-2'>
                <Text className="text-lg text-dark-100 font-medium text-[16px] opacity-100">Futsal Name</Text>
                <View className="relative w-full">
                  <TextInput
                    className="w-full border border-[#5F6567] text-dark-100 font-medium text-[16px] rounded-lg px-4 py-3 h-[50px]"
                    placeholder="Select futsal"
                    placeholderTextColor="#9CA3AF"
                    editable={false}
                  />
                  <View className="absolute right-4 top-3.5">
                    <Ionicons name="chevron-forward" size={20} color="#5F6567" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-light-200 py-4 rounded-xl mt-6 shadow-sm active:opacity-90 items-center justify-center"
            >
              <Text className="text-white text-center font-bold text-lg">Create</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </View>
  );
}