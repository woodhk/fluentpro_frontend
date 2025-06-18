// app/(auth)/sign-in.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { icons, images } from '@/constants';
import { authService } from '@/lib/services/auth.service';
import { validateSignInForm, hasValidationErrors } from '@/utils/validation';
import { ValidationErrors } from '@/types/api/auth.types';

export default function SignInScreen() {
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);

  // Form state
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [generalError, setGeneralError] = useState<string>('');

  // Reset form when screen comes into focus (prevents state persistence)
  useFocusEffect(
    useCallback(() => {
      // Reset form data
      setForm({
        email: '',
        password: '',
      });
      
      // Clear errors
      setErrors({});
      setGeneralError('');
      setLoading(false);
      
      // Cleanup function for when screen loses focus
      return () => {
        // Clear any pending operations
        setLoading(false);
        
        // Blur any focused inputs
        if (passwordRef.current) {
          passwordRef.current.blur();
        }
      };
    }, [])
  );

  const handleInputChange = (field: keyof typeof form) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general error
    if (generalError) {
      setGeneralError('');
    }
  };

  const onSignInPress = async () => {
    try {
      setLoading(true);
      setGeneralError('');

      // Validate form
      const validationErrors = validateSignInForm(form);
      
      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        return;
      }

      // Clear any previous errors
      setErrors({});

      // Attempt sign in with real backend
      const result = await authService.signIn({
        email: form.email.trim(),
        password: form.password,
      });

      if (result.success) {
        // Check if user needs onboarding
        const needsOnboarding = await authService.needsOnboarding();
        
        if (needsOnboarding) {
          router.replace('/(root)/(onboarding)');
        } else {
          router.replace('/(root)/(tabs)/home');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        const errorMessage = error.message;
        
        // Check for specific error types
        if (errorMessage.toLowerCase().includes('email') || 
            errorMessage.toLowerCase().includes('password') ||
            errorMessage.toLowerCase().includes('invalid') ||
            errorMessage.toLowerCase().includes('incorrect')) {
          setGeneralError('Invalid email or password. Please check your credentials and try again.');
        } else if (errorMessage.toLowerCase().includes('network') ||
                   errorMessage.toLowerCase().includes('connection')) {
          setGeneralError('Unable to connect to the server. Please check your internet connection and try again.');
        } else {
          setGeneralError(errorMessage);
        }
      } else {
        setGeneralError('Sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToPassword = () => {
    passwordRef.current?.focus();
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpPerson} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome back 👋
          </Text>
        </View>
        
        <View className="p-5">
          {/* General Error Message */}
          {generalError ? (
            <View className="bg-supporting-error p-3 rounded-lg mb-4 border border-functional-error/20">
              <Text className="text-text-error text-sm">{generalError}</Text>
            </View>
          ) : null}

          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={handleInputChange('email')}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={navigateToPassword}
            autoCapitalize="none"
            containerStyle={errors.email ? "border-functional-error" : ""}
          />
          {errors.email && (
            <Text className="text-functional-error text-xs mt-[-8px] mb-2 ml-2">
              {errors.email}
            </Text>
          )}

          <InputField
            ref={passwordRef}
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={handleInputChange('password')}
            returnKeyType="done"
            onSubmitEditing={onSignInPress}
            containerStyle={errors.password ? "border-functional-error" : ""}
          />
          {errors.password && (
            <Text className="text-functional-error text-xs mt-[-8px] mb-2 ml-2">
              {errors.password}
            </Text>
          )}

          <CustomButton
            title={loading ? "Signing In..." : "Sign In"}
            onPress={onSignInPress}
            className="mt-6"
            disabled={loading}
          />

          {/* Forgot Password Link */}
          <Text className="text-primary-600 text-center text-sm font-JakartaSemiBold mt-4">
            Forgot Password? (Coming Soon)
          </Text>

          <TouchableOpacity 
            onPress={() => router.replace('/(auth)/sign-up')}
            className="mt-10"
          >
            <Text className="text-lg text-center text-general-200">
              Don't have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}