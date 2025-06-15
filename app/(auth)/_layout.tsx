// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: false, // Prevent gesture conflicts
        animationDuration: 250, // Shorter duration
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