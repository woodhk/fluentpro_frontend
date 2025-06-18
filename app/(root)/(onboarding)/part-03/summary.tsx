// Screen 12

import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Icon } from "@/components/atoms/icons/Icon";
import CustomButton from "@/components/atoms/CustomButton";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { part3SummaryData } from "@/constants";
import { apiClient } from "@/lib/api";
import { OnboardingSummary } from '@/types/api/onboarding.types';
import OnboardingSelectionTemplate from "@/components/templates/OnboardingSelectionTemplate";
import SummaryItem from "@/components/molecules/SummaryItem";

interface SummaryItemData {
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
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  const summaryItems: SummaryItemData[] = [
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
        <LoadingSpinner message="Loading" fullScreen={true} />
      </SafeAreaView>
    );
  }

  if (error && !summaryData) {
    return (
      <OnboardingSelectionTemplate
        title="Unable to Load Summary"
        description="There was an issue loading your onboarding summary"
        onContinue={retryFetch}
        continueButtonText="Try Again"
        error={error}
      >
        <View className="justify-center items-center py-20">
          <Icon library="ionicons" name="alert-circle" size={48} color="#EF4444" />
        </View>
      </OnboardingSelectionTemplate>
    );
  }

  return (
    <OnboardingSelectionTemplate
      title="Onboarding Complete!"
      description="Your personalised experience set up is complete"
      onContinue={handleCompleteOnboarding}
      continueButtonText="Complete Onboarding"
      error={error}
      headerContent={false}
    >
      <View className="space-y-6">
        {/* Summary Items */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {summaryItems.map((item, index) => (
            <SummaryItem
              key={index}
              title={item.title}
              description={item.value}
              icon={item.icon}
              bgColor={item.bgColor}
              isLast={index === summaryItems.length - 1}
            />
          ))}
        </View>
      </View>
    </OnboardingSelectionTemplate>
  );
};

export default OnboardingSummaryScreen;