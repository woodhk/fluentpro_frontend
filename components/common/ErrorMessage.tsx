// components/common/ErrorMessage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  variant?: 'inline' | 'banner' | 'toast';
  className?: string;
}

export function ErrorMessage({ 
  message, 
  onDismiss, 
  variant = 'inline',
  className = '' 
}: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'banner':
        return {
          container: 'bg-supporting-error p-4 rounded-lg border border-functional-error/20',
          text: 'text-text-error text-sm',
          icon: '#8B1A1A',
        };
      case 'toast':
        return {
          container: 'bg-functional-error p-4 rounded-lg shadow-lg',
          text: 'text-white text-sm font-medium',
          icon: '#FFFFFF',
        };
      case 'inline':
      default:
        return {
          container: 'bg-supporting-error p-3 rounded-lg border border-functional-error/20',
          text: 'text-text-error text-sm',
          icon: '#8B1A1A',
        };
    }
  };

  const styles = getVariantStyles();
  
  const containerClass = `
    flex-row items-center
    ${styles.container}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <View className={containerClass}>
      <Ionicons 
        name="alert-circle" 
        size={20} 
        color={styles.icon}
        style={{ marginRight: 8 }}
      />
      
      <Text className={`flex-1 ${styles.text}`}>
        {message}
      </Text>
      
      {onDismiss && (
        <TouchableOpacity 
          onPress={onDismiss}
          className="ml-2 p-1"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name="close" 
            size={18} 
            color={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}