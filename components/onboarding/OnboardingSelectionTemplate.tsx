import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';

interface OnboardingSelectionTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onContinue: () => void;
  continueButtonText?: string;
  isContinueDisabled?: boolean;
  error?: string | null;
  showBackButton?: boolean;
  progress?: number; // Value between 0 and 1
}

const OnboardingSelectionTemplate: React.FC<OnboardingSelectionTemplateProps> = ({
  title,
  description,
  children,
  onContinue,
  continueButtonText = "Continue",
  isContinueDisabled = false,
  error,
  showBackButton = true,
  progress = 0,
}) => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header with optional back button and progress */}
        <View className="h-16 flex-row items-center justify-between">
          {showBackButton ? (
            <TouchableOpacity 
              onPress={() => router.back()}
              className="p-2 flex-row items-center"
            >
              <Image 
                source={icons.backArrow} 
                className="w-5 h-5 mr-1"
                style={{ tintColor: '#234BFF' }}
              />
              <Text className="text-primary-600 text-base font-JakartaMedium">Back</Text>
            </TouchableOpacity>
          ) : (
            <View className="w-20" />
          )}
          
          {/* Progress bar placeholder */}
          <View className="flex-1 mx-4">
            {/* Progress bar implementation goes here */}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Title and Description */}
          <View className="mb-8">
            <Text className="text-2xl font-JakartaBold text-text-primary text-center mb-4">
              {title}
            </Text>
            <Text className="text-base font-Jakarta text-text-secondary text-center px-4">
              {description}
            </Text>
          </View>

          {/* Main content area - scrollable */}
          <View className="flex-1">
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
        </View>

        {/* Continue Button */}
        <View className="pb-8">
          {error && (
            <Text className="text-functional-error text-sm text-center mb-4">
              {error}
            </Text>
          )}
          <CustomButton
            title={continueButtonText}
            onPress={onContinue}
            bgVariant="primary"
            disabled={isContinueDisabled}
            className={`${isContinueDisabled ? 'opacity-50' : ''}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingSelectionTemplate;