// app/(root)/_layout.tsx
import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { apiInitService } from '@/lib/services/api-init.service';

export default function AppLayout() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && getToken) {
      // Initialize API clients with Clerk token provider
      apiInitService.initializeApiClients(getToken);
    }
  }, [isLoaded, getToken]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to auth if not signed in
      router.replace('/(auth)/welcome');
    }
  }, [isLoaded, isSignedIn]);

  // Show loading state while auth is loading
  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  // Show nothing if not signed in (redirect will handle this)
  if (!isSignedIn) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="onboarding" 
        options={{
          title: 'Onboarding',
          // Prevent going back during onboarding
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="home" 
        options={{
          title: 'Home',
        }}
      />
    </Stack>
  );
}