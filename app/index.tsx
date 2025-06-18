// app/index.tsx
import React from 'react';
import { View } from 'react-native';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
import { useOnboardingRedirect } from '@/lib/hooks/useOnboardingRedirect';

export default function AuthLoadingScreen() {
  const { loading, error } = useOnboardingRedirect();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LoadingSpinner
        message="Loading FluentPro..."
        fullScreen
      />
    </View>
  );
}