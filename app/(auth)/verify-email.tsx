// app/(auth)/verify-email.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import InputField from '@/components/atoms/InputField';
import CustomButton from '@/components/atoms/CustomButton';
import { images } from '@/constants';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    
    try {
      setLoading(true);
      setError('');

      if (!code.trim()) {
        setError('Please enter the verification code');
        return;
      }

      // Attempt to complete the email verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      // Set the session active after successful verification
      await setActive({ session: completeSignUp.createdSessionId });

      // Navigate to onboarding flow for new users
      router.replace('/(root)/(onboarding)');
    } catch (error: any) {
      console.error('Email verification error:', error);
      
      // Handle Clerk-specific errors
      if (error.errors && error.errors.length > 0) {
        const clerkError = error.errors[0];
        if (clerkError.code === 'form_code_incorrect') {
          setError('Incorrect verification code. Please try again.');
        } else if (clerkError.code === 'verification_expired') {
          setError('Verification code has expired. Please request a new one.');
        } else {
          setError(clerkError.message || 'Verification failed. Please try again.');
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onResendPress = async () => {
    if (!isLoaded) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Resend verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
      setError(''); // Clear any previous errors
      // You could show a success message here
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpPerson} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Verify Your Email 📧
          </Text>
        </View>
        
        <View className="p-5">
          <Text className="text-base text-text-secondary mb-6 leading-6">
            We've sent a verification code to your email address. Please enter the 6-digit code below to complete your account setup.
          </Text>

          {/* Error Message */}
          {error ? (
            <View className="bg-supporting-error p-3 rounded-lg mb-4 border border-functional-error/20">
              <Text className="text-text-error text-sm">{error}</Text>
            </View>
          ) : null}

          <InputField
            label="Verification Code"
            placeholder="Enter 6-digit code"
            value={code}
            onChangeText={(value) => {
              setCode(value);
              if (error) setError('');
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={onVerifyPress}
            maxLength={6}
            autoCapitalize="none"
            containerStyle={error ? "border-functional-error" : ""}
          />

          <CustomButton
            title={loading ? "Verifying..." : "Verify Email"}
            onPress={onVerifyPress}
            className="mt-6"
            disabled={loading || !isLoaded}
          />

          {/* Resend Code */}
          <TouchableOpacity 
            onPress={onResendPress}
            disabled={loading}
            className="mt-4"
          >
            <Text className="text-primary-600 text-center text-sm font-JakartaSemiBold">
              Didn't receive the code? Resend
            </Text>
          </TouchableOpacity>

          {/* Back to Sign Up */}
          <TouchableOpacity 
            onPress={() => router.replace('/(auth)/sign-up')}
            className="mt-10"
          >
            <Text className="text-lg text-center text-general-200">
              Want to use a different email?{" "}
              <Text className="text-primary-500">Back to Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}