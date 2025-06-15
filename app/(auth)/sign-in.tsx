// app/(auth)/sign-in.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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

      // Attempt sign in
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
        setGeneralError(error.message);
      } else {
        setGeneralError('Sign in failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToPassword = () => {
    passwordRef.current?.focus();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-text-primary mb-2">
                Welcome back
              </Text>
              <Text className="text-base text-text-secondary">
                Sign in to continue your language learning journey
              </Text>
            </View>

            {/* General Error Message */}
            {generalError ? (
              <ErrorMessage
                message={generalError}
                onDismiss={() => setGeneralError('')}
                variant="banner"
                className="mb-6"
              />
            ) : null}

            {/* Sign In Form */}
            <View className="mb-8">
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
              />
            </View>

            {/* Sign In Button */}
            <LoadingButton
              title="Sign In"
              onPress={handleSubmit}
              loading={loading}
              containerClassName="mb-6"
            />

            {/* Forgot Password - Placeholder for future implementation */}
            <TouchableOpacity className="mb-8">
              <Text className="text-primary-600 text-center text-base font-medium">
                Forgot Password? (Coming Soon)
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-8">
              <View className="flex-1 h-px bg-light-300" />
              <Text className="mx-4 text-text-secondary text-sm">or</Text>
              <View className="flex-1 h-px bg-light-300" />
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-text-secondary text-base">
                Don't have an account?{' '}
              </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="text-primary-600 text-base font-medium">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}