import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

export default function Settings() {
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string | null>('');
  const [open, setOpen] = useState<'start' | 'end' | null>(null);
  const [location, setLocation] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
  });

  const router = useRouter();

const TIME_OPTIONS = [
  '6 AM','7 AM','8 AM','9 AM','10 AM','11 AM',
  '12 PM','1 PM','2 PM','3 PM','4 PM','5 PM',
  '6 PM','7 PM','8 PM','9 PM','10 PM'
];

const filteredEndTimes = startTime
    ? TIME_OPTIONS.slice(TIME_OPTIONS.indexOf(startTime) + 1)
    : TIME_OPTIONS;

  const Dropdown = ({
    value,
    onPress,
    placeholder,
  }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-neutral-800 px-4 py-3 rounded-lg flex-row items-center justify-between"
    >
      <Text className={value ? 'text-white' : 'text-gray-500'}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={18} color="#9ca3af" />
    </TouchableOpacity>
  );

  const onMapPress = (e: MapPressEvent) => {
    setLocation(e.nativeEvent.coordinate);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900 p-4">
    <View className="flex-1 bg-neutral-900 p-4">
      <Text className="text-white text-lg font-semibold mb-4">About Futsal</Text>
      <Text className="text-white mb-1">Description *</Text>
       <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        editable
        multiline
        numberOfLines={4}
        placeholderTextColor="#888"
        className="bg-neutral-800 text-white px-4 py-3 rounded-lg mb-3"
      />
       <Text className="text-white mb-1">Phone Number *</Text>
      <TextInput
        value={phone}
        keyboardType='numeric'
        onChangeText={setPhone}
        placeholder="Enter phone number"
        placeholderTextColor="#888"
        className="bg-neutral-800 text-white px-4 py-3 rounded-lg mb-3"
      />
      {/* Address */}
      <Text className="text-white mb-1">Address *</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Sankhamul"
        placeholderTextColor="#888"
        className="bg-neutral-800 text-white px-4 py-3 rounded-lg mb-3"
      />

      <Text className="text-gray-300 mb-2">
        Search for a location or click on the map
      </Text>

      {/* Place Search */}
      <View
        style={{
          zIndex: 10, 
          elevation: 10,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search place in Nepal"
          fetchDetails={true}
          enablePoweredByContainer={false}
          debounce={400}
          onPress={(data, details = null) => {
            if (!details) return;

            const { lat, lng } = details.geometry.location;

            setAddress(data.description);
            setLocation({
              latitude: lat,
              longitude: lng,
            });
          }}
          query={{
            key: 'YAIzaSyD2BGWy5q1Hl_3ZQIsn9XfBX6_QisZHTMI&callback=initMap',
            language: 'en',
            components: 'country:np',
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              backgroundColor: '#1f2933',
              color: 'white',
              height: 48,
              borderRadius: 8,
            },
            listView: {
              backgroundColor: '#111',
            },
          }}
        />
      </View>

      {/*  Map */}
      <View className="h-64 mt-4 rounded-lg overflow-hidden">
        <MapView
          style={{ flex: 1 }}
          region={{
            ...location,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          onPress={onMapPress}
        >
          <Marker coordinate={location} />
        </MapView>
      </View>

      {/* Coordinates */}
      <View className="flex-row gap-3 mt-4">
        <View className="flex-1">
          <Text className="text-white mb-1">Latitude</Text>
          <TextInput
            editable={false}
            value={location.latitude.toString()}
            className="bg-neutral-800 text-white px-3 py-2 rounded-lg"
          />
        </View>

        <View className="flex-1">
          <Text className="text-white mb-1">Longitude</Text>
          <TextInput
            editable={false}
            value={location.longitude.toString()}
            className="bg-neutral-800 text-white px-3 py-2 rounded-lg"
          />
        </View>
        
      </View>

      {/*Timings*/}
        <View className="flex-row gap-3 mt-4">
        <View className="flex-1">
          <Text className="text-white mb-1">Start Time*</Text>
           <Dropdown
            value={startTime}
            placeholder="Select an option"
            onPress={() => setOpen('start')}
          />
        </View>

      
        <View className="flex-1">
          <Text className="text-white mb-1">End TIme*</Text>
           <Dropdown
            value={endTime}
            placeholder="Select an option"
            onPress={() => setOpen('end')}
          />
        </View>
      </View>
       {/* Dropdown Modal */}
      <Modal transparent visible={!!open} animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-center px-6"
          onPress={() => setOpen(null)}
        >
          <View className="bg-neutral-800 rounded-xl max-h-80">
            <FlatList
              data={open === 'start' ? TIME_OPTIONS : filteredEndTimes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (open === 'start') {
                      setStartTime(item);
                      setEndTime(null);
                    } else {
                      setEndTime(item);
                    }
                    setOpen(null);
                  }}
                  className="px-4 py-3 border-b border-neutral-700"
                >
                  <Text className="text-white">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      {/* --- Action Buttons --- */}
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
    </ScrollView>
  );
}
