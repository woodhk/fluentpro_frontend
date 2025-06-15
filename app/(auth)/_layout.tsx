// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Configure transition animations
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="sign-in" 
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen 
        name="sign-up" 
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack>
  );
}