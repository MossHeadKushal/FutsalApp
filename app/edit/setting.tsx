import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Settings() {
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string | null>(null);
  const [open, setOpen] = useState<'start' | 'end' | null>(null);
  
  const [location, setLocation] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
  });

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const VISIBLE_MAP_STYLE = [
    { "elementType": "geometry", "stylers": [{ "color": "#9caebc" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#00c187" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e0f2f1" }] }
  ];

  const TIME_OPTIONS = ['6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM'];

  const handleCoordinateChange = (key: 'latitude' | 'longitude', value: string) => {
    // Keep raw value for typing convenience (e.g., allowing "-" or ".")
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setLocation(prev => ({ ...prev, [key]: numericValue }));
    } else if (value === '' || value === '-') {
      setLocation(prev => ({ ...prev, [key]: 0 }));
    }
  };

  const Dropdown = ({ value, onPress, placeholder }: any) => (
    <TouchableOpacity onPress={onPress} className="bg-secondary px-4 py-3 rounded-lg flex-row items-center justify-between">
      <Text className="text-black font-semibold">{value || placeholder}</Text>
      <Ionicons name="chevron-down" size={18} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // Adjust the offset below if the keyboard still covers inputs
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView 
          className="p-3" 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="text-black text-lg font-semibold mb-4">About Futsal</Text>
          
          <Text className="text-black font-semibold mb-2">Description *</Text>
          <TextInput 
            value={description} 
            onChangeText={setDescription} 
            placeholder="Enter description" 
            multiline 
            numberOfLines={4} 
            className="bg-secondary text-black px-4 py-3 rounded-lg mb-3" 
            textAlignVertical="top" 
          />

          <Text className="text-black font-semibold mb-2">Phone Number *</Text>
          <TextInput 
            value={phone} 
            keyboardType='numeric' 
            onChangeText={setPhone} 
            placeholder="Enter phone number" 
            className="bg-secondary text-black px-4 py-3 rounded-lg mb-3" 
          />

          <Text className="text-black font-semibold mb-2">Address *</Text>
          <TextInput 
            value={address} 
            onChangeText={setAddress} 
            placeholder="Sankhamul" 
            className="bg-secondary text-black px-4 py-3 rounded-lg mb-3" 
          />

          <Text className="text-black font-semibold mb-2">Enter Coordinates or Drag Pin</Text>

          <View className="h-64 mt-2 rounded-lg overflow-hidden border border-gray-100">
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              customMapStyle={VISIBLE_MAP_STYLE}
              region={{
                latitude: location.latitude || 27.7172,
                longitude: location.longitude || 85.3240,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
            >
              <Marker 
                coordinate={location} 
                draggable 
                onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
              />
            </MapView>
          </View>

          {/* Coordinate Inputs - Now pushed up by KeyboardAvoidingView */}
          <View className="flex-row gap-3 mt-4">
            <View className="flex-1">
              <Text className="text-black font-semibold mb-2">Latitude</Text>
              <TextInput
                keyboardType="decimal-pad"
                // Using a string conversion to allow better typing control
                value={location.latitude.toString()}
                onChangeText={(val) => handleCoordinateChange('latitude', val)}
                className="bg-secondary text-black px-3 py-2 rounded-lg font-semibold"
              />
            </View>

            <View className="flex-1">
              <Text className="text-black font-semibold mb-2">Longitude</Text>
              <TextInput
                keyboardType="decimal-pad"
                value={location.longitude.toString()}
                onChangeText={(val) => handleCoordinateChange('longitude', val)}
                className="bg-secondary text-black px-3 py-2 rounded-lg fonts-semibold"
              />
            </View>
          </View>

          <View className="flex-row gap-3 mt-4">
            <View className="flex-1">
              <Text className="text-black mb-1">Start Time*</Text>
              <Dropdown value={startTime} placeholder="Select" onPress={() => setOpen('start')} />
            </View>
            <View className="flex-1">
              <Text className="text-black mb-1">End Time*</Text>
              <Dropdown value={endTime} placeholder="Select" onPress={() => setOpen('end')} />
            </View>
          </View>

          <View className="flex-row mb-5 mt-8 items-center">
            <TouchableOpacity 
              className="bg-primary rounded-lg py-4 px-8 mr-3 flex-1" 
              onPress={() => Alert.alert('Saved', 'Settings Updated')}
            >
              <Text className="text-white text-center font-bold">Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} className="py-4 px-8">
              <Text className="text-red-500 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: insets.bottom + 70 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal transparent visible={!!open} animationType="fade">
        <TouchableOpacity className="flex-1 bg-black/20 justify-center px-6" onPress={() => setOpen(null)}>
          <View className="bg-white rounded-xl max-h-80 overflow-hidden">
            <FlatList
              data={open === 'start' ? TIME_OPTIONS : (startTime ? TIME_OPTIONS.slice(TIME_OPTIONS.indexOf(startTime) + 1) : TIME_OPTIONS)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (open === 'start') { setStartTime(item); setEndTime(null); }
                    else { setEndTime(item); }
                    setOpen(null);
                  }}
                  className="px-4 py-4 border-b border-gray-100"
                >
                  <Text className="text-black font-semibold text-center">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}