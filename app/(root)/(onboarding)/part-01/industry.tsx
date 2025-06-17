import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setIndustry, updateIndustry, type Industry } from '@/lib/slices/onboardingSlice';
import { industries, icons } from '@/constants';
import OptionBox from '@/components/OptionBox';
import CustomButton from '@/components/CustomButton';

const IndustryScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { industry, isLoading, error } = useAppSelector((state) => state.onboarding);
  
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(industry);

  const handleIndustrySelect = (industryId: string) => {
    const selected = industryId as Industry;
    setSelectedIndustry(selected);
    // Update local state optimistically
    dispatch(updateIndustry(selected));
  };

  const handleContinue = async () => {
    if (!selectedIndustry) {
      Alert.alert('Selection Required', 'Please select an industry to continue.');
      return;
    }

    try {
      await dispatch(setIndustry(selectedIndustry)).unwrap();
      // Navigate to next screen on success
      router.push('/(root)/(onboarding)/part-01/role-select');
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to save industry selection. Please try again.');
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
              What's your industry?
            </Text>
            <Text className="text-base font-Jakarta text-text-secondary text-center px-4">
              We'll personalize your learning experience based on your professional field.
            </Text>
          </View>

          {/* Industry Options - Scrollable List */}
          <View className="flex-1">
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                {industries.map((industryOption, index) => (
                  <View key={industryOption.id} className={index < industries.length - 1 ? "mb-4" : ""}>
                    <OptionBox
                      id={industryOption.id}
                      name={industryOption.name}
                      icon={industryOption.icon as any}
                      isSelected={selectedIndustry === industryOption.id}
                      available={industryOption.available}
                      onSelect={handleIndustrySelect}
                    />
                  </View>
                ))}
              </View>
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
            title="Continue"
            onPress={handleContinue}
            bgVariant="primary"
            disabled={!selectedIndustry || isLoading}
            className={`${!selectedIndustry || isLoading ? 'opacity-50' : ''}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IndustryScreen;