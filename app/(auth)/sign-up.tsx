// app/(auth)/sign-up.tsx
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
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { icons, images } from '@/constants';
import { authService } from '@/lib/services/auth.service';
import { validateSignUpForm, hasValidationErrors } from '@/utils/validation';
import { ValidationErrors } from '@/types/api/auth.types';

export default function SignUpScreen() {
  const router = useRouter();
  
  // Refs for form navigation
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        [emailRef, passwordRef, confirmPasswordRef].forEach(ref => {
          if (ref.current) {
            ref.current.blur();
          }
        });
      };
    }, [])
  );

  const handleInputChange = (field: keyof typeof form) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field === 'name' ? 'fullName' : field]) {
      setErrors(prev => ({ ...prev, [field === 'name' ? 'fullName' : field]: undefined }));
    }
    
    // Clear general error
    if (generalError) {
      setGeneralError('');
    }
  };

  const onSignUpPress = async () => {
    try {
      setLoading(true);
      setGeneralError('');

      // Validate form
      const validationErrors = validateSignUpForm({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        fullName: form.name,
      });
      
      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        return;
      }

      // Clear any previous errors
      setErrors({});

      // Prepare signup data
      const signUpData = {
        email: form.email.trim(),
        password: form.password,
        full_name: form.name.trim(),
      };

      // Attempt sign up
      const result = await authService.signUp(signUpData);

      if (result.success) {
        // Navigate to onboarding flow for new users
        router.replace('/(root)/(onboarding)');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        // Check for specific backend errors
        if (error.message.includes('email')) {
          setErrors({ email: 'Email already exists or is invalid' });
        } else if (error.message.includes('password')) {
          setErrors({ password: 'Password does not meet requirements' });
        } else {
          setGeneralError(error.message);
        }
      } else {
        setGeneralError('Sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Navigation helpers for better UX
  const navigateToEmail = () => emailRef.current?.focus();
  const navigateToPassword = () => passwordRef.current?.focus();
  const navigateToConfirmPassword = () => confirmPasswordRef.current?.focus();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpPerson} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
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
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={handleInputChange('name')}
            returnKeyType="next"
            onSubmitEditing={navigateToEmail}
            containerStyle={errors.fullName ? "border-functional-error" : ""}
          />
          {errors.fullName && (
            <Text className="text-functional-error text-xs mt-[-8px] mb-2 ml-2">
              {errors.fullName}
            </Text>
          )}

          <InputField
            ref={emailRef}
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
            returnKeyType="next"
            onSubmitEditing={navigateToConfirmPassword}
            containerStyle={errors.password ? "border-functional-error" : ""}
          />
          {errors.password && (
            <Text className="text-functional-error text-xs mt-[-8px] mb-2 ml-2">
              {errors.password}
            </Text>
          )}

          <InputField
            ref={confirmPasswordRef}
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.confirmPassword}
            onChangeText={handleInputChange('confirmPassword')}
            returnKeyType="done"
            onSubmitEditing={onSignUpPress}
            containerStyle={errors.confirmPassword ? "border-functional-error" : ""}
          />
          {errors.confirmPassword && (
            <Text className="text-functional-error text-xs mt-[-8px] mb-2 ml-2">
              {errors.confirmPassword}
            </Text>
          )}


          {/* Password Requirements */}
          <View className="bg-primary-50 p-3 rounded-lg mt-4 mb-4">
            <Text className="text-primary-800 text-sm font-JakartaSemiBold mb-2">
              Password Requirements:
            </Text>
            <Text className="text-primary-700 text-xs leading-4">
              • At least 8 characters long
            </Text>
            <Text className="text-primary-700 text-xs leading-4">
              • Contains uppercase and lowercase letters
            </Text>
            <Text className="text-primary-700 text-xs leading-4">
              • Contains at least one number
            </Text>
            <Text className="text-primary-700 text-xs leading-4">
              • Contains at least one special character (@$!%*?&)
            </Text>
          </View>

          <CustomButton
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={onSignUpPress}
            className="mt-6"
            disabled={loading}
          />

          {/* Terms and Privacy */}
          <Text className="text-text-secondary text-xs text-center mt-4 px-4 leading-5">
            By creating an account, you agree to our{' '}
            <Text className="text-primary-600 font-JakartaSemiBold">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-primary-600 font-JakartaSemiBold">Privacy Policy</Text>
          </Text>

          <TouchableOpacity 
            onPress={() => router.replace('/(auth)/sign-in')}
            className="mt-10"
          >
            <Text className="text-lg text-center text-general-200">
              Already have an account?{" "}
              <Text className="text-primary-500">Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}