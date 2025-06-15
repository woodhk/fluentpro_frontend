// app/(auth)/sign-in.tsx
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
import { validateSignInForm, hasValidationErrors } from '../../utils/validation';
import { ValidationErrors } from '../../lib/types';

export default function SignInScreen() {
  const router = useRouter();
  const passwordRef = useRef<TextInput>(null);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      email: '',
      password: '',
    });
    
    // Clear errors
    setErrors({});
    setGeneralError('');
    setLoading(false);
    
    // Ensure TextInput refs are properly cleaned
    if (passwordRef.current) {
      passwordRef.current.blur();
    }
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
      const validationErrors = validateSignInForm(formData);
      
      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        return;
      }

      // Clear any previous errors
      setErrors({});

      // Attempt sign in with real backend
      const result = await authService.signIn({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        // Check if user needs onboarding
        const needsOnboarding = await authService.needsOnboarding();
        
        if (needsOnboarding) {
          router.replace('/(app)/onboarding');
        } else {
          router.replace('/(app)/home');
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

  const handleNavigateToSignUp = () => {
    if (navigationDisabled) return;
    
    setNavigationDisabled(true);
    router.replace('/(auth)/sign-up');
    
    // Re-enable after transition completes
    setTimeout(() => setNavigationDisabled(false), 300);
  };

  return (
    <SafeAreaView key="sign-in-screen" className="flex-1 bg-white">
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
            {/* Logo Section - VERIFIED with Expo docs */}
            <View className="items-center mb-8 mt-4">
              <Image 
                source={require('../../assets/images/logo.png')}
                style={{ width: 96, height: 96 }}
                contentFit="contain"
              />
            </View>

            {/* Enhanced Header - VERIFIED NativeWind classes */}
            <View className="mb-10">
              <Text className="text-3xl font-bold text-text-primary text-center mb-3">
                Welcome back
              </Text>
              <Text className="text-base text-text-secondary text-center leading-6 px-4">
                Sign in to continue your language learning journey
              </Text>
            </View>

            {/* General Error Message - Enhanced */}
            {generalError ? (
              <ErrorMessage
                message={generalError}
                onDismiss={() => setGeneralError('')}
                variant="banner"
                className="mb-8 mx-2"
              />
            ) : null}

            {/* Enhanced Sign In Form - VERIFIED spacing classes */}
            <View className="mb-10">
              <View className="space-y-6">
                <FormInput
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
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  placeholder="Enter your password"
                  required
                  containerClassName="mb-0"
                />
              </View>
            </View>

            {/* Enhanced Sign In Button - VERIFIED shadow classes */}
            <View className="mb-8">
              <LoadingButton
                title="Sign In"
                onPress={handleSubmit}
                loading={loading}
                variant="primary"
                containerClassName="shadow-lg shadow-primary-600/25 py-4 rounded-2xl"
                textClassName="text-white font-bold text-lg"
              />
            </View>

            {/* Enhanced Forgot Password */}
            <TouchableOpacity className="mb-10">
              <Text className="text-primary-600 text-center text-base font-semibold">
                Forgot Password? (Coming Soon)
              </Text>
            </TouchableOpacity>

            {/* Enhanced Divider - VERIFIED layout classes */}
            <View className="flex-row items-center mb-8">
              <View className="flex-1 h-px bg-light-300" />
              <Text className="mx-6 text-text-secondary text-sm font-medium">or</Text>
              <View className="flex-1 h-px bg-light-300" />
            </View>

            {/* Enhanced Sign Up Link */}
            <View className="flex-row justify-center items-center bg-light-100 py-4 rounded-xl">
              <Text className="text-text-secondary text-base mr-2">
                Don't have an account?
              </Text>
              <TouchableOpacity 
                onPress={handleNavigateToSignUp}
                disabled={navigationDisabled}
                style={{ opacity: navigationDisabled ? 0.6 : 1 }}
              >
                <Text className="text-primary-600 text-base font-bold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}