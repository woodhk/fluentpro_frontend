import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { Icon } from '@/components/icons/Icon';
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
  headerContent?: React.ReactNode; // For progress bar or other header content
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
  headerContent,
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
              className="w-10 h-10 items-center justify-center"
            >
              <Icon library="ionicons" name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
          ) : (
            <View className="w-10" />
          )}
          
          {/* Progress bar or other header content */}
          <View className="flex-1 mx-4">
            {headerContent}
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