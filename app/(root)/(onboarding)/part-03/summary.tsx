// Screen 12

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Icon } from "@/components/icons/Icon";
import CustomButton from "@/components/CustomButton";
import { part3SummaryData } from "@/constants";
import { images } from "@/constants";
import { apiClient } from "@/lib/api";
import { OnboardingSummary } from "@/lib/types";

interface SummaryItem {
  title: string;
  value: string;
  icon: {
    library: 'ionicons' | 'material' | 'feather' | 'font-awesome' | 'material-community' | 'ant-design' | 'entypo' | 'font-awesome-5';
    name: string;
  };
  bgColor: string;
}

const OnboardingSummaryScreen = () => {
  const [summaryData, setSummaryData] = useState<OnboardingSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.getOnboardingSummary();
        
        if (response.success) {
          setSummaryData(response.summary);
        } else {
          setError(response.message || 'Failed to fetch onboarding summary');
        }
      } catch (err) {
        console.error('Error fetching onboarding summary:', err);
        setError('Failed to load onboarding summary. Please try again.');
        
        // For development, show mock data if API fails
        const mockSummaryData: OnboardingSummary = {
          native_language: "english",
          native_language_display: "English",
          industry_id: "hotels_hospitality",
          industry_name: "Hotels & Hospitality",
          role: {
            id: "concierge",
            title: "Concierge",
            description: "Assists guests with various services and requests",
            is_custom: false,
            industry_name: "Hotels & Hospitality"
          },
          communication_partners: [
            {
              id: "clients",
              name: "Clients",
              description: "External clients",
              priority: 1,
              situations: [
                {
                  id: "meetings",
                  name: "Meetings",
                  description: "Business meetings",
                  priority: 1
                }
              ]
            }
          ],
          total_partners: 3,
          total_situations: 10,
          onboarding_status: "completed",
          is_complete: true
        };
        setSummaryData(mockSummaryData);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  const summaryItems: SummaryItem[] = [
    {
      title: part3SummaryData.nativeLanguage.title,
      value: summaryData?.native_language_display || "English",
      icon: part3SummaryData.nativeLanguage.icon,
      bgColor: part3SummaryData.nativeLanguage.bgColor
    },
    {
      title: part3SummaryData.industry.title,
      value: summaryData?.industry_name || "Hotels & Hospitality",
      icon: part3SummaryData.industry.icon,
      bgColor: part3SummaryData.industry.bgColor
    },
    {
      title: part3SummaryData.role.title,
      value: summaryData?.role.title || "Concierge",
      icon: part3SummaryData.role.icon,
      bgColor: part3SummaryData.role.bgColor
    },
    {
      title: part3SummaryData.partners.title,
      value: `${summaryData?.total_partners || 3} Selected`,
      icon: part3SummaryData.partners.icon,
      bgColor: part3SummaryData.partners.bgColor
    }
  ];

  const handleCompleteOnboarding = () => {
    // Navigate to complete screen
    router.push("/(root)/(onboarding)/part-03/complete");
  };

  const SummaryItemComponent = ({ item }: { item: SummaryItem }) => (
    <View className="flex-row items-center py-4 border-b border-gray-100">
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: `${item.bgColor}20` }}
      >
        <Icon
          library={item.icon.library as any}
          name={item.icon.name as any}
          size={24}
          color={item.bgColor}
        />
      </View>
      <View className="flex-1">
        <Text className="text-gray-500 text-sm font-medium">{item.title}</Text>
        <Text className="text-gray-900 text-lg font-semibold mt-1">{item.value}</Text>
      </View>
    </View>
  );

  const retryFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getOnboardingSummary();
      
      if (response.success) {
        setSummaryData(response.summary);
      } else {
        setError(response.message || 'Failed to fetch onboarding summary');
      }
    } catch (err) {
      console.error('Error fetching onboarding summary:', err);
      setError('Failed to load onboarding summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !summaryData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-6">
          <Icon library="ionicons" name="alert-circle" size={48} color="#EF4444" />
          <Text className="text-lg text-gray-900 font-semibold text-center mt-4 mb-2">
            Unable to Load Summary
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            {error}
          </Text>
          <CustomButton
            title="Try Again"
            onPress={retryFetch}
            bgVariant="primary"
            className="w-full max-w-xs"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <View className="items-center pt-8 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0 top-8 w-10 h-10 items-center justify-center"
          >
            <Icon library="ionicons" name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Success Icon */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
            <Icon library="ionicons" name="checkmark" size={48} color="#10B981" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            Onboarding Complete!
          </Text>
          <Text className="text-gray-600 text-center">
            Your personalised experience set up is complete
          </Text>
        </View>

        {/* Summary Items */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          {summaryItems.map((item, index) => (
            <SummaryItemComponent
              key={index}
              item={item}
            />
          ))}
        </View>

        {/* Complete Button */}
        <View className="pb-8">
          <CustomButton
            title="Complete Onboarding"
            onPress={handleCompleteOnboarding}
            bgVariant="primary"
            className="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingSummaryScreen;