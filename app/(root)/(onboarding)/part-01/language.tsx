// Screen 3

import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setNativeLanguage, updateNativeLanguage, type NativeLanguage } from '@/lib/slices/onboardingSlice';
import { nativeLanguages } from '@/constants';
import LanguageCheckbox from '@/components/LanguageCheckbox';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import { TouchableOpacity, Image } from 'react-native';

const NativeLanguageScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { nativeLanguage, isLoading, error } = useAppSelector((state) => state.onboarding);
  
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(nativeLanguage);

  const handleLanguageSelect = (languageId: string) => {
    const language = nativeLanguages.find(lang => lang.id === languageId);
    if (language && language.available) {
      setSelectedLanguage(languageId);
      // Optimistically update local state
      dispatch(updateNativeLanguage(languageId as NativeLanguage));
    }
  };

  const handleContinue = async () => {
    if (!selectedLanguage) {
      Alert.alert('Selection Required', 'Please select your native language to continue.');
      return;
    }

    try {
      await dispatch(setNativeLanguage(selectedLanguage as NativeLanguage)).unwrap();
      // Navigate to next screen on success
      router.push('/(root)/(onboarding)/part-01/role-select');
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to save language selection. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header with back button and progress */}
        <View className="h-16 flex-row items-center justify-between">
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
          
          {/* Progress bar placeholder */}
          <View className="flex-1 mx-4">
            {/* scrollbar implementation goes here */}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Title and Subtitle */}
          <View className="mb-8">
            <Text className="text-2xl font-JakartaBold text-text-primary text-center mb-4">
              What's Your Native Language?
            </Text>
            <Text className="text-base font-Jakarta text-text-secondary text-center px-4">
              This will help our tutors explain concepts to you in your mother tongue
            </Text>
          </View>

          {/* Language Options - 2x3 Grid */}
          <View className="flex-1">
            <View className="flex-row flex-wrap justify-between">
              {nativeLanguages.map((language) => (
                <View key={language.id} style={{ width: '48%', marginBottom: 16 }}>
                  <LanguageCheckbox
                    id={language.id}
                    name={language.name}
                    emoji={language.emoji}
                    isSelected={selectedLanguage === language.id}
                    available={language.available}
                    onSelect={handleLanguageSelect}
                  />
                </View>
              ))}
            </View>
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
            title="Continue"
            onPress={handleContinue}
            bgVariant="primary"
            disabled={!selectedLanguage || isLoading}
            className={`${!selectedLanguage || isLoading ? 'opacity-50' : ''}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NativeLanguageScreen;