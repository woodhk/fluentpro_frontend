import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';

interface OnboardingTemplateProps {
  title: string;
  subtitle?: string;
  secondParagraph?: string;
  illustration: any; // Image source
  primaryButtonText: string;
  onPrimaryPress: () => void;
  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
  showBackButton?: boolean;
  progress?: number; // Value between 0 and 1
}

const OnboardingTemplate: React.FC<OnboardingTemplateProps> = ({
  title,
  subtitle,
  secondParagraph,
  illustration,
  primaryButtonText,
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
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
            {/* scrollbar implementation goes here */}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center items-center">
          {/* Title */}
          <Text className="text-4xl font-JakartaBold text-text-primary text-center mb-4">
            {title}
          </Text>

          {/* Subtitle/Description */}
          {subtitle && (
            <Text className="text-lg font-Jakarta text-text-secondary text-center mb-3 px-4">
              {subtitle}
            </Text>
          )}

          {/* Second paragraph if exists */}
          {secondParagraph && (
            <Text className="text-base font-Jakarta text-text-secondary text-center mb-6 px-4">
              {secondParagraph}
            </Text>
          )}

          {/* Image */}
          <View className="w-full aspect-square max-w-sm mb-8">
            <Image 
              source={illustration} 
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="pb-8">
          <CustomButton
            title={primaryButtonText}
            onPress={onPrimaryPress}
            bgVariant="primary"
            className="mb-4"
          />
          
          {secondaryButtonText && onSecondaryPress && (
            <CustomButton
              title={secondaryButtonText}
              onPress={onSecondaryPress}
              bgVariant="outline"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingTemplate;