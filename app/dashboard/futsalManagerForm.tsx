// FutsalManagerForm.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    className="bg-secondary rounded-lg h-10 px-3 flex-row items-center justify-between"
    onPress={() => Alert.alert('Simulating Picker', 'A dropdown or modal would open here')}
  >
    <Text className={selectedValue ? 'text-black text-[12px]' : 'text-black/60 text-[12px]'}>
      {selectedValue || 'Select an option'}
    </Text>
    <Text className="text-black/60 text-[12px]">V</Text>
  </TouchableOpacity>
);

// --- Main Form Component (NativeWind styled) ---
const FutsalManagerForm: React.FC<FutsalManagerFormProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [futsal, setFutsal] = useState<string>(''); // Placeholder state
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = (andAnother: boolean = false) => {
    Alert.alert(
      'Form Submission',
      `Action: ${andAnother ? 'Create & Create Another' : 'Create'}\nName: ${name}\nEmail: ${email}\nFutsal: ${futsal || 'Not Selected'}`
    );
    // Add logic for API call here
  };

  const handleCancel = () => {
    // show a loading spinner while cancelling
    setLoading(true);
    setName('');
    setEmail('');
    setPhone('');
    setFutsal('');
    setTimeout(() => {
      // navigate back after a short delay
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <View className="gap-30 flex-1 bg-white">
      <View className="p-5 flex-1">
        {/* Title */}
        <Text className="justify-center text-center text-2xl font-semibold text-black mb-8">Create Futsal Manager</Text>

        {/* --- Form Fields --- */}
        <View className="mx-[-10] mb-5 space-y-4">

          {/* Name */}
          <View className="mx-2">
            <Text className="text-sm text-black ml-4 p-1 font-semibold">Name</Text>
            <TextInput
              className="bg-secondary border-hairline rounded-full h-12 px-4 text-black"
              onChangeText={setName}
              value={name}
              placeholder="Enter full name"
              placeholderTextColor="black"
            />
          </View>

          {/* Email */}
          <View className="mx-2">
            <Text className="text-sm text-black font-semibold mt-1 ml-4 p-1">Email*</Text>
            <TextInput
              className="bg-secondary border-hairline rounded-full h-12 px-4 text-black"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="black"
            />
          </View>

          {/* Phone */}
          <View className="mx-2">
            <Text className="text-sm text-black font-semibold mt-1 ml-4 p-1">Phone*</Text>
            <TextInput
              className="bg-secondary border-hairline rounded-full h-12 px-4 text-black"
              onChangeText={setPhone}
              value={phone}
              keyboardType="phone-pad"
              placeholder="Enter phone"
              placeholderTextColor="black"
              maxLength={15}
            />
          </View>

          {/* Futsal */}
          <View className="mx-2">
            <Text className="text-sm text-black font-semibold mt-1 ml-4 p-1">Futsal*</Text>
            <FutsalPicker selectedValue={futsal} onSelect={setFutsal} />
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