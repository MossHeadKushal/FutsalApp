import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useManagers } from '../context/ManagerContext';

export default function CreateManager() {

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [futsal, setFutsal] = useState<string>('');
  const router = useRouter();
  const { addManager } = useManagers();


  const handleCreate = (andAnother: boolean = false) => {
    if (!name || !futsal) {
      Alert.alert('Error', 'Name and Futsal are required');
      return;
    }
    setLoading(true);

    addManager({
      name,
      futsal,
      location: 'Kathmandu', // Default for now as it's not in form
      email,
      phone,
    });

    Alert.alert(
      'Success',
      'Manager Created Successfully'
    );

    setTimeout(() => {
      setLoading(false);
      if (andAnother) {
        setName('');
        setEmail('');
        setPhone('');
        setFutsal('');
      } else {
        router.back();
      }
    }, 500);
  };


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
    }, 500);
  };



  return (


    <View className="flex-1 bg-[#205E30]">
      {/* Header Section */}
      <View className="h-[10%]">
        <View className="flex-row items-center gap-3 p-5 mt-[12px]">
          <TouchableOpacity activeOpacity={0.7}
            onPress={handleCancel}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">Create Futsal Manager</Text>
          </View>
        </View>
      </View>

      {/* Form Content Area */}
      <View className="h-[90%] mt-4 flex-row   px-4 py-4 flex-1 bg-[#F0F4F9] rounded-t-3xl">
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
                value={name}
                onChangeText={setName}
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
                value={email}
                onChangeText={setEmail}
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
                value={phone}
                onChangeText={setPhone}
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
                    // editable={false} // Make editable for now to allow input
                    value={futsal}
                    onChangeText={setFutsal}
                  />
                  {/* <View className="absolute right-4 top-3.5">
                    <Ionicons name="chevron-forward" size={20} color="#5F6567" />
                  </View> */}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-light-200 py-4 rounded-xl mt-6 shadow-sm active:opacity-90 items-center justify-center"

              onPress={() => handleCreate(false)}
              disabled={loading}
            >

              <Text className="text-white text-center font-bold text-lg"

              >Create</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </View>
  );
}