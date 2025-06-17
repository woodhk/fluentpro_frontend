import { Stack } from 'expo-router';

export default function OnboardingLayout() {
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
        name="index" 
        options={{
          title: 'Onboarding',
        }}
      />
      <Stack.Screen 
        name="welcome" 
        options={{
          title: 'Welcome',
        }}
      />




    </Stack>
  );
}