// app/(auth)/sign-up.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { FormInput } from '../../components/auth/FormInput';
import { LoadingButton } from '../../components/auth/LoadingButton';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { authService } from '../../lib/auth';
import { validateSignUpForm, hasValidationErrors } from '../../utils/validation';
import { ValidationErrors } from '../../lib/types';

export default function SignUpScreen() {
  const router = useRouter();
  
  // Refs for form navigation
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const dateOfBirthRef = useRef<TextInput>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [navigationDisabled, setNavigationDisabled] = useState(false);

  // Cleanup and reset when component mounts
  useEffect(() => {
    // Reset form data
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
    });
    
    // Clear errors
    setErrors({});
    setGeneralError('');
    setLoading(false);
    
    // Ensure all TextInput refs are properly cleaned
    [emailRef, passwordRef, confirmPasswordRef, dateOfBirthRef].forEach(ref => {
      if (ref.current) {
        ref.current.blur();
      }
    });
  }, []);

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general error
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setGeneralError('');

      // Validate form
      const validationErrors = validateSignUpForm({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth || undefined,
      });
      
      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        return;
      }

      // Clear any previous errors
      setErrors({});

      // Prepare signup data
      const signUpData = {
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.fullName.trim(),
        ...(formData.dateOfBirth && { date_of_birth: formData.dateOfBirth }),
      };

      // Attempt sign up
      const result = await authService.signUp(signUpData);

      if (result.success) {
        // Navigate to onboarding flow for new users
        router.replace('/(root)/onboarding');
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
  const navigateToDateOfBirth = () => dateOfBirthRef.current?.focus();

  const handleNavigateToSignIn = () => {
    if (navigationDisabled) return;
    
    setNavigationDisabled(true);
    router.replace('/(auth)/sign-in');
    
    setTimeout(() => setNavigationDisabled(false), 300);
  };

  return (
    <SafeAreaView key="sign-up-screen" className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="min-h-full"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 py-4">
            {/* Logo Section - VERIFIED smaller size for sign-up */}
            <View className="items-center mb-6 mt-2">
              <Image 
                source={require('../../assets/images/logo.png')}
                style={{ width: 96, height: 96 }}
                contentFit="contain"
              />
            </View>

            {/* Enhanced Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-text-primary text-center mb-3">
                Create Account
              </Text>
              <Text className="text-base text-text-secondary text-center leading-6 px-2">
                Join FluentPro and start your personalized learning journey
              </Text>
            </View>

            {/* General Error Message - Enhanced */}
            {generalError ? (
              <ErrorMessage
                message={generalError}
                onDismiss={() => setGeneralError('')}
                variant="banner"
                className="mb-6 mx-2"
              />
            ) : null}

            {/* Enhanced Sign Up Form - VERIFIED space-y classes */}
            <View className="mb-6">
              <View className="space-y-5">
                <FormInput
                  label="Full Name"
                  value={formData.fullName}
                  onChangeText={handleInputChange('fullName')}
                  error={errors.fullName}
                  returnKeyType="next"
                  onSubmitEditing={navigateToEmail}
                  placeholder="Enter your full name"
                  required
                  containerClassName="mb-0"
                />

                <FormInput
                  ref={emailRef}
                  label="Email"
                  value={formData.email}
                  onChangeText={handleInputChange('email')}
                  error={errors.email}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={navigateToPassword}
                  placeholder="Enter your email"
                  required
                  containerClassName="mb-0"
                />

                <FormInput
                  ref={passwordRef}
                  label="Password"
                  value={formData.password}
                  onChangeText={handleInputChange('password')}
                  error={errors.password}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={navigateToConfirmPassword}
                  placeholder="Create a strong password"
                  required
                  containerClassName="mb-0"
                />

                <FormInput
                  ref={confirmPasswordRef}
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={handleInputChange('confirmPassword')}
                  error={errors.confirmPassword}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={navigateToDateOfBirth}
                  placeholder="Confirm your password"
                  required
                  containerClassName="mb-0"
                />

                <FormInput
                  ref={dateOfBirthRef}
                  label="Date of Birth (Optional)"
                  value={formData.dateOfBirth}
                  onChangeText={handleInputChange('dateOfBirth')}
                  error={errors.dateOfBirth}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  placeholder="YYYY-MM-DD"
                  containerClassName="mb-0"
                />
              </View>

              {/* Enhanced Password Requirements - VERIFIED primary color classes */}
              <View className="bg-primary-50 border border-primary-100 p-4 rounded-xl mt-4">
                <View className="flex-row items-center mb-3">
                  <Text className="text-lg mr-2">🔒</Text>
                  <Text className="text-primary-800 text-sm font-bold">
                    Password Requirements:
                  </Text>
                </View>
                <View className="space-y-1">
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
              </View>
            </View>

            {/* Enhanced Create Account Button */}
            <View className="mb-6">
              <LoadingButton
                title="Create Account"
                onPress={handleSubmit}
                loading={loading}
                variant="primary"
                containerClassName="shadow-lg shadow-primary-600/25 py-4 rounded-2xl"
                textClassName="text-white font-bold text-lg"
              />
            </View>

            {/* Enhanced Terms and Privacy */}
            <View className="mb-8 px-4">
              <Text className="text-text-secondary text-xs text-center leading-5">
                By creating an account, you agree to our{' '}
                <Text className="text-primary-600 font-semibold">Terms of Service</Text>
                {' '}and{' '}
                <Text className="text-primary-600 font-semibold">Privacy Policy</Text>
              </Text>
            </View>

            {/* Enhanced Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-light-300" />
              <Text className="mx-6 text-text-secondary text-sm font-medium">or</Text>
              <View className="flex-1 h-px bg-light-300" />
            </View>

            {/* Enhanced Sign In Link */}
            <View className="flex-row justify-center items-center bg-light-100 py-4 rounded-xl">
              <Text className="text-text-secondary text-base mr-2">
                Already have an account?
              </Text>
              <TouchableOpacity 
                onPress={handleNavigateToSignIn}
                disabled={navigationDisabled}
                style={{ opacity: navigationDisabled ? 0.6 : 1 }}
              >
                <Text className="text-primary-600 text-base font-bold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}