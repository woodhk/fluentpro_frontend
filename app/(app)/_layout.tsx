// app/(app)/_layout.tsx
import { Stack } from 'expo-router';

export default function AppLayout() {
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