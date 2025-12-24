// FutsalManagerForm.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Define the component props (none needed for this simple form, but good practice)
interface FutsalManagerFormProps {}

// Define the props for the simulated picker component
interface FutsalPickerProps {
  onSelect: (value: string) => void;
  selectedValue: string;
}

// --- Simulated Dropdown Component (NativeWind styled) ---
const FutsalPicker: React.FC<FutsalPickerProps> = ({ selectedValue }) => (
  <TouchableOpacity
    className="bg-neutral-800 rounded-lg h-12 px-4 flex-row items-center justify-between border border-neutral-800"
    onPress={() => Alert.alert('Simulating Picker', 'A dropdown or modal would open here')}
  >
    <Text
      className={
        selectedValue
          ? 'text-base text-gray-200'
          : 'text-base text-gray-500'
      }
    >
      {selectedValue || 'Select an option'}
    </Text>
    <Text className="text-gray-500 text-sm">V</Text>
  </TouchableOpacity>
);

// --- Main Form Component (NativeWind styled) ---
const FutsalManagerForm: React.FC<FutsalManagerFormProps> = () => {
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [courts, setCourts] = useState<string>(''); 
  const [active, setActive] = useState<boolean>(true);
   const [loading, setLoading] = useState<boolean>(false);
  

  const handleCreate = (andAnother: boolean = false) => {
    setLoading(true);
    Alert.alert(
      'Form Submission',
      `Action: ${andAnother ? 'Create & Create Another' : 'Create'}\nName: ${name}\nSlug: ${slug}\nAddress: ${address}\nCourts: ${courts || 'Not Selected'}`
    );
    // Add logic for API call here
    setTimeout(() => {
          // navigate back after a short delay
          setLoading(false);
          router.back();
        }, 1000);
  };

  const handleCancel = () => {
    setLoading(true);
    setName('');
    setSlug('');
    setAddress('');
    setCourts('');
    //Alert.alert('Action', 'Form cancelled and cleared.');
      setTimeout(() => {
        // navigate back after a short delay
        setLoading(false);
        router.back();
      }, 1000);
  };

  return (
    <View className=" gap-30 flex-1 bg-white">
      <View className="p-5 flex-1">
        {/* Title */}
        <Text className="justify-center text-center text-2xl font-semibold text-black mb-8">
          Create New Futsal
        </Text>

        {/* --- Form Fields --- */}
<View className="mx-[-10] mb-5 space-y-4">

  {/* Name */}
  <View className="mx-2">
    <Text className="text-sm text-black ml-4 p-1 font-semibold ">Name</Text>
    <TextInput
      className="bg-secondary border-hairline rounded-full h-12 px-4 text-black"
      value={name}
      onChangeText={setName}
      placeholder="Enter full name"
      placeholderTextColor="black"
    />
  </View>

  {/* Slug */}
  <View className="mx-2">
    <Text className="text-sm text-black font-semibold mt-1 ml-4 p-1">Slug*</Text>
    <TextInput
      className="bg-secondary border-hairline rounded-full h-12 px-4 text-black "
      value={slug}
      keyboardType='numeric'
      onChangeText={setSlug}
      placeholder="Enter unique slug"
      placeholderTextColor="black"
    />
  </View>

  {/* Address */}
  <View className="mx-2">
    <Text className="text-sm text-black font-semibold mt-1 ml-4 p-1">Address*</Text>
    <TextInput
      className="bg-secondary border-hairline rounded-full h-12 px-4 text-black"
      value={address}
      onChangeText={setAddress}
      placeholder="Enter your address"
      placeholderTextColor="black"
    />
  </View>

  {/* Active Switch */}
  <View className=" mx-2 flex-row justify-end items-center mb-2">
    <Text className="font-semibold text-sm text-black">
      {active ? 'Active' : 'Inactive'}
    </Text>
    <Switch
      value={active}
      onValueChange={setActive}
      trackColor={{ false: '#525252', true: '#22c55e' }}
      thumbColor={active ? '#16a34a' : '#f9fafb'}
    />
  </View>

  {/* Number of Courts */}
  <View className="mx-2">
    <Text className="text-sm text-black font-semibold mt-1 ml-4 p-1">Number of courts*</Text>
    <TextInput
      className="bg-secondary border-hairline rounded-full h-12 px-4 text-black"
      value={courts}
      onChangeText={setCourts}
      keyboardType="numeric"
      placeholder="Enter number of courts"
      placeholderTextColor="black"
    />
  </View>

</View>

         {/* --- Action Buttons --- */}
                <View className="flex-row mt-3 items-center">
                  <TouchableOpacity
                    className={`bg-primary rounded-lg py-3 px-5 mr-3 ${loading ? 'opacity-50' : ''}`}
                    onPress={() => handleCreate(false)}
                    disabled={loading}
                  >
                    <Text className="text-black text-base font-semibold">Create</Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity
                    className={`bg-secondary rounded-lg py-3 px-5 mr-3 border border-gray-400 ${loading ? 'opacity-50' : ''}`}
                    onPress={() => handleCreate(true)}
                    disabled={loading}
                  >
                    <Text className="text-black text-base font-semibold">Create & create another</Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity
                    className={`rounded-lg py-3 border border-gray-400 px-5 ${loading ? 'opacity-50' : ''}`}
                    onPress={handleCancel}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#ef4444" />
                    ) : (
                      <Text className="text-red-500 text-base font-semibold">Cancel</Text>
                    )}
                  </TouchableOpacity>
                </View>
      </View>
    </View>
  );
};

export default FutsalManagerForm;