import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { LoadingSpinnerProps } from '@/types/components/ui.types';

export function LoadingSpinner({
  size = 'large',
  color = '#234BFF',
  message,
  fullScreen = false,
  className = '',
}: LoadingSpinnerProps) {
  const containerClass = fullScreen
    ? `flex-1 justify-center items-center bg-white ${className}`
    : `justify-center items-center p-8 ${className}`;

  return (
    <View className={containerClass}>
      <ActivityIndicator size={size} color={color} />
      
      {message && (
        <Text className="text-text-secondary text-base mt-4 text-center">
          {message}
        </Text>
      )}
    </View>
  );
}