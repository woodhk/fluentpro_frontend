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
      
      {/* Part 1 Screens */}
      <Stack.Screen 
        name="part-01/intro" 
        options={{
          title: 'Part 1 Introduction',
        }}
      />
      <Stack.Screen 
        name="part-01/language" 
        options={{
          title: 'Native Language',
        }}
      />
      <Stack.Screen 
        name="part-01/role-select" 
        options={{
          title: 'Role Selection',
        }}
      />
      <Stack.Screen 
        name="part-01/role-input" 
        options={{
          title: 'Role Input',
        }}
      />
      <Stack.Screen 
        name="part-01/industry" 
        options={{
          title: 'Industry',
        }}
      />
      <Stack.Screen 
        name="part-01/complete" 
        options={{
          title: 'Part 1 Complete',
        }}
      />
      
      {/* Part 2 Screens */}
      <Stack.Screen 
        name="part-02/intro" 
        options={{
          title: 'Part 2 Introduction',
        }}
      />
      <Stack.Screen 
        name="part-02/partners" 
        options={{
          title: 'Partners',
        }}
      />
      <Stack.Screen 
        name="part-02/situations" 
        options={{
          title: 'Situations',
        }}
      />
      <Stack.Screen 
        name="part-02/complete" 
        options={{
          title: 'Part 2 Complete',
        }}
      />
      
      {/* Part 3 Screens */}
      <Stack.Screen 
        name="part-03/summary" 
        options={{
          title: 'Summary',
        }}
      />
      <Stack.Screen 
        name="part-03/complete" 
        options={{
          title: 'Onboarding Complete',
        }}
      />

    </Stack>
  );
}