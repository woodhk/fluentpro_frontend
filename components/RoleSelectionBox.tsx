import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { icons } from '@/constants';
import { RoleMatch } from '@/lib/types';

interface RoleSelectionBoxProps {
  role: RoleMatch;
  isSelected: boolean;
  onSelect: (role: RoleMatch) => void;
}

const RoleSelectionBox: React.FC<RoleSelectionBoxProps> = ({
  role,
  isSelected,
  onSelect,
}) => {
  const handlePress = () => {
    onSelect(role);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`
        p-4 rounded-xl border-2 mb-3
        ${isSelected 
          ? 'border-primary-600 bg-primary-50' 
          : 'border-neutral-200 bg-white'
        }
      `}
    >
      {/* Header with title and match percentage */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className={`
          text-lg font-JakartaSemiBold flex-1 mr-2
          ${isSelected ? 'text-primary-600' : 'text-text-primary'}
        `}>
          {role.title}
        </Text>
        
        {/* Best Match Badge */}
        {role.confidence_score >= 0.7 && (
          <View className="bg-accent-100 px-2 py-1 rounded-full">
            <Text className="text-accent-600 text-xs font-JakartaMedium">
              Best Match
            </Text>
          </View>
        )}
      </View>

      {/* Match percentage */}
      <View className="flex-row items-center mb-3">
        <View className="flex-1 bg-neutral-100 rounded-full h-2 mr-3">
          <View 
            className="bg-primary-500 h-2 rounded-full"
            style={{ width: `${Math.round(role.confidence_score * 100)}%` }}
          />
        </View>
        <Text className="text-text-secondary text-sm font-JakartaMedium">
          {Math.round(role.confidence_score * 100)}% Match
        </Text>
      </View>

      {/* Description */}
      <Text className="text-text-secondary text-sm font-Jakarta leading-5">
        {role.description}
      </Text>

      {/* Selection indicator */}
      {isSelected && (
        <View className="absolute top-4 right-4">
          <View className="w-6 h-6 bg-primary-600 rounded-full items-center justify-center">
            <Text className="text-white text-xs">✓</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RoleSelectionBox;