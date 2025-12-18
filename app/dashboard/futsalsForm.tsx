// FutsalManagerForm.tsx

import React, { useState } from 'react';
import {
    Alert,
    StatusBar,
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
  const [courts, setCourts] = useState<string>(''); // Placeholder state
  const [active, setActive] = useState<boolean>(true);

  const handleCreate = (andAnother: boolean = false) => {
    Alert.alert(
      'Form Submission',
      `Action: ${andAnother ? 'Create & Create Another' : 'Create'}\nName: ${name}\nSlug: ${slug}\nAddress: ${address}\nCourts: ${courts || 'Not Selected'}`
    );
    // Add logic for API call here
  };

  const handleCancel = () => {
    setName('');
    setSlug('');
    setAddress('');
    setCourts('');
    Alert.alert('Action', 'Form cancelled and cleared.');
  };

  return (
    <View className=" gap-30 flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View className="p-5 flex-1">
        {/* Title */}
        <Text className="text-2xl font-bold text-white mb-8">
          Create Futsal Manager
        </Text>

        {/* --- Form Fields --- */}
        {/* --- Form Fields --- */}
<View className="mx-[-10] mb-5 space-y-4">

  {/* Name */}
  <View className="mx-2">
    <Text className="text-sm text-gray-200 mb-1">Name</Text>
    <TextInput
      className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
      value={name}
      onChangeText={setName}
      placeholder="Enter full name"
      placeholderTextColor="#A0A0A0"
    />
  </View>

  {/* Slug */}
  <View className="mx-2">
    <Text className="text-sm text-gray-200 mb-1">Slug*</Text>
    <TextInput
      className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
      value={slug}
      onChangeText={setSlug}
      placeholder="Enter unique slug"
      placeholderTextColor="#A0A0A0"
    />
  </View>

  {/* Address */}
  <View className="mx-2">
    <Text className="text-sm text-gray-200 mb-1">Address*</Text>
    <TextInput
      className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
      value={address}
      onChangeText={setAddress}
      placeholder="Enter your address"
      placeholderTextColor="#A0A0A0"
    />
  </View>

  {/* Active Switch */}
  <View className=" mx-2 flex-row justify-end items-center mb-2">
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

  {/* Number of Courts */}
  <View className="mx-2">
    <Text className="text-sm text-gray-200 mb-1">Number of courts*</Text>
    <TextInput
      className="bg-neutral-800 rounded-lg h-12 px-4 text-white text-base"
      value={courts}
      onChangeText={setCourts}
      keyboardType="numeric"
      placeholder="Enter number of courts"
      placeholderTextColor="#A0A0A0"
    />
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
    </View>
  );
};

export default FutsalManagerForm;