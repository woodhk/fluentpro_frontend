// app/(auth)/sign-in.tsx
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import InputField from '@/components/atoms/InputField';
import CustomButton from '@/components/atoms/CustomButton';
import { icons, images } from '@/constants';
import { validateSignInForm, hasValidationErrors } from '@/utils/validation';
import { ValidationErrors } from '@/types/api/auth.types';
import { onboardingApi } from '@/lib/api/onboarding.api';
import { STORAGE_KEYS } from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen() {
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);
  const { signIn, setActive, isLoaded } = useSignIn();

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
    if (!isLoaded) return;
    
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

      // Attempt sign in with Clerk
      const completeSignIn = await signIn.create({
        identifier: form.email.trim(),
        password: form.password,
      });

      // Set the session active
      await setActive({ session: completeSignIn.createdSessionId });

      // Check onboarding status from backend
      try {
        const onboardingStatus = await onboardingApi.getOnboardingStatus();
        
        if (onboardingStatus.completed) {
          // Onboarding complete, go to home
          router.replace('/(root)/(tabs)/home');
        } else {
          // Onboarding not complete, go to welcome page
          const incompleteSteps = [
            'not_started',
            'native_language', 
            'industry_selection',
            'role_input',
            'role_select',
            'communication_partners',
            'situation_selection',
            'summary'
          ];
          
          if (incompleteSteps.includes(onboardingStatus.current_step)) {
            router.replace('/(root)/(onboarding)/welcome');
          } else {
            // Unknown step, redirect to welcome as fallback
            router.replace('/(root)/(onboarding)/welcome');
          }
        }
      } catch (onboardingError) {
        console.error('Failed to check onboarding status:', onboardingError);
        // On error, default to welcome page
        router.replace('/(root)/(onboarding)/welcome');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Handle Clerk-specific errors
      if (error.errors && error.errors.length > 0) {
        const clerkError = error.errors[0];
        if (clerkError.code === 'form_identifier_not_found' || clerkError.code === 'form_password_incorrect') {
          setGeneralError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setGeneralError(clerkError.message || 'Sign in failed. Please try again.');
        }
      } else if (error instanceof Error) {
        const errorMessage = error.message;
        
        if (errorMessage.toLowerCase().includes('network') ||
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
            disabled={loading || !isLoaded}
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