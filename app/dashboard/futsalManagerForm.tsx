// FutsalManagerForm.tsx

import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StatusBar,
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
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [futsal, setFutsal] = useState<string>(''); // Placeholder state

  const handleCreate = (andAnother: boolean = false) => {
    Alert.alert(
      'Form Submission',
      `Action: ${andAnother ? 'Create & Create Another' : 'Create'}\nName: ${name}\nEmail: ${email}\nFutsal: ${futsal || 'Not Selected'}`
    );
    // Add logic for API call here
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setFutsal('');
    Alert.alert('Action', 'Form cancelled and cleared.');
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View className="p-5 flex-1">
        {/* Title */}
        <Text className="text-2xl font-bold text-white mb-8">
          Create Futsal Manager
        </Text>

        {/* --- Form Fields --- */}
        <View className="flex-row mx-[-10] mb-5">
          {/* Name */}
          <View className="flex-1 mx-2">
            <Text className="text-sm text-gray-200 mb-1">Name</Text>
            <TextInput
              className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
              onChangeText={setName}
              value={name}
              placeholder=" "
              placeholderTextColor="#A0A0A0" // Neutral-500 equivalent
            />
          </View>

          {/* Email */}
          <View className="flex-1 mx-2">
            <Text className="text-sm text-gray-200 mb-1">Email*</Text>
            <TextInput
              className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              placeholder=" "
              placeholderTextColor="#A0A0A0"
            />
          </View>
        </View>

        <View className="flex-row mx-[-10] mb-5">
          {/* Phone */}
          <View className="flex-1 mx-2">
            <Text className="text-sm text-gray-200 mb-1">Phone*</Text>
            <TextInput
              className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
              onChangeText={setPhone}
              value={phone}
              keyboardType="phone-pad"
              placeholder=" "
              placeholderTextColor="#A0A0A0"
              maxLength={15}
            />
          </View>

          {/* Futsal (Dropdown) */}
          <View className="flex-1 mx-2">
            <Text className="text-sm text-gray-200 mb-1">Futsal*</Text>
            <FutsalPicker selectedValue={futsal} onSelect={setFutsal} />
          </View>
        </View>

        {/* --- Action Buttons --- */}
        <View className="flex-row mt-3 items-center">
          <TouchableOpacity
            className="bg-green-600 rounded-lg py-3 px-5 mr-3"
            onPress={() => handleCreate(false)}
          >
            <Text className="text-white text-base font-semibold">Create</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-neutral-800 rounded-lg py-3 px-5 mr-3 border border-gray-400"
            onPress={() => handleCreate(true)}
          >
            <Text className="text-white text-base font-semibold">
              Create & create another
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-lg py-3 px-5"
            onPress={handleCancel}
          >
            <Text className="text-gray-500 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FutsalManagerForm;