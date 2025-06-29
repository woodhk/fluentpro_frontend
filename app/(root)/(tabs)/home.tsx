// app/(root)/home.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LoadingButton } from '@/components/molecules/LoadingButton';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';

export default function HomeScreen() {
  const router = useRouter();
  const { signOut, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [loading, setLoading] = useState(false);

  const isFullyLoaded = authLoaded && userLoaded;

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      router.replace('/(auth)/welcome');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force navigation even if sign out fails
      router.replace('/(auth)/welcome');
    } finally {
      setLoading(false);
    }
  };

  if (!isFullyLoaded || loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <LoadingSpinner message="Loading your dashboard..." fullScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-light-300">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-text-primary">
              Hello, {user?.fullName || user?.firstName || 'User'}! 👋
            </Text>
            <Text className="text-text-secondary mt-1">
              Welcome to your FluentPro dashboard
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleSignOut}
            className="p-2 rounded-full bg-light-100"
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 px-6 py-8">
          {/* Welcome Card */}
          <View className="bg-primary-50 p-6 rounded-xl mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-3xl mr-3">🚀</Text>
              <Text className="text-xl font-bold text-primary-800">
                You're all set!
              </Text>
            </View>
            <Text className="text-primary-700 leading-6">
              Your account has been successfully created and you're now logged in to FluentPro. 
              The main app features will be implemented here.
            </Text>
          </View>

          {/* User Info Card */}
          <View className="bg-white border border-light-300 rounded-xl p-6 mb-8">
            <Text className="text-lg font-semibold text-text-primary mb-4">
              Your Account Information
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={20} color="#666666" />
                <Text className="text-text-secondary ml-3 flex-1">
                  {user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Not provided'}
                </Text>
              </View>
              
              <View className="flex-row items-center">
                <Ionicons name="mail-outline" size={20} color="#666666" />
                <Text className="text-text-secondary ml-3 flex-1">
                  {user?.primaryEmailAddress?.emailAddress || 'Not provided'}
                </Text>
              </View>
              
              
              <View className="flex-row items-center">
                <Ionicons 
                  name="checkmark-circle-outline"
                  size={20} 
                  color="#34C759"
                />
                <Text className="ml-3 flex-1 text-functional-success">
                  Account Active
                </Text>
              </View>
            </View>
          </View>

          {/* Features Preview */}
          <View className="bg-light-100 p-6 rounded-xl mb-8">
            <Text className="text-lg font-semibold text-text-primary mb-4">
              🔮 Coming Soon
            </Text>
            <Text className="text-text-secondary leading-6 mb-4">
              Here's what will be available in your FluentPro experience:
            </Text>
            
            <View className="space-y-3">
              {[
                '📚 Personalized learning content',
                '🎯 Industry-specific language training', 
                '💼 Professional communication scenarios',
                '📊 Progress tracking and analytics',
                '🏆 Achievement system and badges',
                '👥 Practice with AI conversation partners'
              ].map((feature, index) => (
                <Text key={index} className="text-text-secondary">
                  {feature}
                </Text>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            <LoadingButton
              title="Start Learning (Coming Soon)"
              variant="primary"
              onPress={() => {
                // Placeholder for future navigation
                console.log('Start learning pressed');
              }}
            />
            
            <LoadingButton
              title="View Profile (Coming Soon)"
              variant="outline"
              onPress={() => {
                // Placeholder for future navigation
                console.log('View profile pressed');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}