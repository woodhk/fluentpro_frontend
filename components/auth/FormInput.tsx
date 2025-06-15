// components/auth/FormInput.tsx
import React, { useState, forwardRef } from 'react';
import { 
  TextInput, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInputProps,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormInputProps extends Omit<TextInputProps, 'keyboardType' | 'returnKeyType'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  required?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const FormInput = forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      value,
      onChangeText,
      error,
      secureTextEntry = false,
      keyboardType = 'default',
      returnKeyType = 'next',
      onSubmitEditing,
      required = false,
      containerClassName = '',
      inputClassName = '',
      labelClassName = '',
      errorClassName = '',
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const hasError = Boolean(error);
    const isPassword = secureTextEntry;
    const showPasswordToggle = isPassword && value.length > 0;

    const handlePasswordToggle = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const baseContainerClass = `mb-4 ${containerClassName}`;
    const baseLabelClass = `text-sm font-bold mb-3 ${
      hasError ? 'text-functional-error' : 'text-text-primary'
    } ${labelClassName}`;
    
    const baseInputClass = `flex-1 min-h-[52px] px-4 py-4 text-base text-text-primary bg-white rounded-xl border-2 ${
      hasError 
        ? 'border-functional-error bg-supporting-error' 
        : isFocused 
        ? 'border-primary-600 bg-primary-50' 
        : 'border-light-300 bg-white'
    } shadow-sm ${inputClassName}`;

    const baseErrorClass = `text-sm text-functional-error mt-1 ${errorClassName}`;

    return (
      <View className={baseContainerClass}>
        {/* Label */}
        <Text className={baseLabelClass}>
          {label}
          {required && <Text className="text-functional-error ml-1">*</Text>}
        </Text>

        {/* Input Container */}
        <View className="relative">
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isPassword && !isPasswordVisible}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            className={baseInputClass}
            placeholderTextColor="#999999"
            autoCapitalize={
              keyboardType === 'email-address' ? 'none' :
              label.toLowerCase().includes('name') ? 'words' : 'sentences'
            }
            autoCorrect={keyboardType === 'email-address' ? false : true}
            blurOnSubmit={returnKeyType === 'done'}
            {...props}
          />

          {/* Password visibility toggle */}
          {showPasswordToggle && (
            <TouchableOpacity
              onPress={handlePasswordToggle}
              className="absolute right-3 top-3 p-1"
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color={hasError ? '#FF3B30' : '#666666'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Error Message */}
        {hasError && (
          <View className="flex-row items-center mt-1">
            <Ionicons name="alert-circle" size={16} color="#FF3B30" />
            <Text className={`${baseErrorClass} ml-1`}>
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';