import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { useAuth } from '../authContext';


export default function Index() {
  const [loading, setLoading] = useState(false);
   const { logout } = useAuth();

 
 


 
  return (
    <View className="flex-1 bg-white p-4 justify-center items-center ">
        <Text className="text-xl font-semibold ">
          Admin Dashboard
        </Text>

        {/* <TouchableOpacity
          onPress={handleLogout}
          disabled={loading}
          className="p-2 bg-gray-500 rounded-xl"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white">Logout</Text>
          )}
        </TouchableOpacity> */}
      </View>
  );
}
