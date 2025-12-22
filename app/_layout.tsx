import { Ionicons } from '@expo/vector-icons';
import { Stack, usePathname, useRouter } from 'expo-router';
import React, { ComponentProps, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AuthProvider } from './authContext';
import './global.css';

type IconName = ComponentProps<typeof Ionicons>['name'];

const NAV_ITEMS: { label: string; icon: IconName; route: string }[] = [
  { label: 'Home', icon: 'home-outline', route: '/dashboard' },
  { label: 'Managers', icon: 'person-outline', route: '/dashboard/futsalManagers' },
  { label: 'Futsals', icon: 'football-outline', route: '/dashboard/futsals' },
];

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

function MainContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoginPage = pathname === '/';

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      router.replace('/');
    }, 500);
  };

  return (
    <View className="flex-1 bg-[#171717]">
      {/* 1. TOP HEADER AREA (Light Green) */}
      {!isLoginPage && (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#B7F000" />
          <View 
            style={{ height: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight }} 
            className="bg-[#00c187] w-full" 
          />
        </>
      )}

      {/* 2. THE SCREEN CONTENT */}
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="edit" />
        </Stack>
      </View>

      {/* 3. Global Navigation Menu */}
      {!isLoginPage && (
        <View 
          style={[
            styles.floatingBar,
            { bottom: Platform.OS === 'android' ? 40 : 30 }
          ]}
        >
          {NAV_ITEMS.map((item) => {
            // FIX: Use exact matching for Home to prevent "double active" state
            // and startsWith for others to allow sub-page highlighting.
            const isActive = item.route === '/dashboard' 
              ? pathname === '/dashboard' || pathname === '/dashboard/'
              : pathname.startsWith(item.route);

            return (
              <TouchableOpacity
                key={item.route}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
                className="flex-1 items-center justify-center relative"
              >
                {/* {isActive && (
                    <View className="absolute w-10 h-auto bg-[#ffffff] rounded-full" />
                )} */}

                <View className={`items-center justify-center w-12 h-12  ${isActive ? 'bg-[#00c187] rounded-full': ''}`}>
                  <Ionicons 
                    name={item.icon} 
                    size={22} 
                    color={isActive ? '#ffffff' : '#6b7280'} 
                  />
                </View>

                {/* Disable text when NOT active */}
                
                  <Text className="text-[10px] mt-1 text-[#0f0D23] font-bold rounded-full">
                    {item.label}
                  </Text>
                
              </TouchableOpacity>
            );
          })}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            className="flex-1 items-center justify-center"
          >
            <View className="items-center justify-center w-12 h-12">
              {isLoggingOut ? (
                <ActivityIndicator size="small" color="#ef4444" />
              ) : (
                <Ionicons name="log-out-outline" size={22} color="#ef4444" />
              )}
            </View>
            {/* Always show logout text or disable it? (Following your pattern) */}
            <Text className="text-[10px] text-red-600 font-medium mt-1">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 75,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    zIndex: 999, 
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  }
});