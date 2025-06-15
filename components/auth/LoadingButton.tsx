// components/auth/LoadingButton.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  View, 
  TouchableOpacityProps 
} from 'react-native';

interface LoadingButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  containerClassName?: string;
  textClassName?: string;
  loadingColor?: string;
}

export function LoadingButton({
  title,
  loading = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = true,
  containerClassName = '',
  textClassName = '',
  loadingColor,
  disabled,
  onPress,
  ...props
}: LoadingButtonProps) {
  const isDisabled = disabled || loading;

  // Base styles for different variants
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: `bg-primary-600 ${isDisabled ? 'opacity-50' : ''}`,
          text: 'text-white',
          loading: loadingColor || '#FFFFFF',
        };
      case 'secondary':
        return {
          container: `bg-light-200 ${isDisabled ? 'opacity-50' : ''}`,
          text: 'text-text-primary',
          loading: loadingColor || '#1A1A1A',
        };
      case 'outline':
        return {
          container: `bg-transparent border-2 border-primary-600 ${isDisabled ? 'opacity-50' : ''}`,
          text: 'text-primary-600',
          loading: loadingColor || '#234BFF',
        };
      default:
        return {
          container: `bg-primary-600 ${isDisabled ? 'opacity-50' : ''}`,
          text: 'text-white',
          loading: loadingColor || '#FFFFFF',
        };
    }
  };

  // Size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: 'min-h-[36px] px-3 py-2',
          text: 'text-sm',
        };
      case 'medium':
        return {
          container: 'min-h-[48px] px-6 py-3',
          text: 'text-base',
        };
      case 'large':
        return {
          container: 'min-h-[56px] px-8 py-4',
          text: 'text-lg',
        };
      default:
        return {
          container: 'min-h-[48px] px-6 py-3',
          text: 'text-base',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerClass = `
    ${fullWidth ? 'w-full' : ''}
    ${sizeStyles.container}
    ${variantStyles.container}
    rounded-lg
    flex-row
    items-center
    justify-center
    ${containerClassName}
  `.trim().replace(/\s+/g, ' ');

  const textClass = `
    ${sizeStyles.text}
    ${variantStyles.text}
    font-semibold
    ${textClassName}
  `.trim().replace(/\s+/g, ' ');

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      className={containerClass}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.8}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variantStyles.loading}
          style={{ marginRight: 8 }}
        />
      )}
      
      <Text className={textClass}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
}