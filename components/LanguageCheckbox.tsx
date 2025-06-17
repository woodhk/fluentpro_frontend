import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '@/constants';

interface LanguageCheckboxProps {
  id: string;
  name: string;
  nativeName: string;
  flagUrl?: string;
  icon?: any; // For icon-based options in future screens
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const LanguageCheckbox: React.FC<LanguageCheckboxProps> = ({
  id,
  name,
  nativeName,
  flagUrl,
  icon,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      className={`
        flex-row items-center p-4 rounded-lg border-2 mb-3
        ${isSelected 
          ? 'border-primary-600 bg-primary-50' 
          : 'border-light-300 bg-white'
        }
      `}
    >
      {/* Flag or Icon */}
      <View className="w-12 h-12 rounded-full bg-light-200 mr-4 overflow-hidden justify-center items-center">
        {flagUrl ? (
          <Image 
            source={{ uri: flagUrl }} 
            className="w-8 h-6"
            resizeMode="cover"
          />
        ) : icon ? (
          <Image 
            source={icon} 
            className="w-6 h-6"
            style={{ tintColor: '#666666' }}
          />
        ) : (
          <View className="w-8 h-6 bg-light-300 rounded" />
        )}
      </View>
      
      {/* Language Text */}
      <View className="flex-1">
        <Text className="text-base font-JakartaMedium text-text-primary">
          {name}
        </Text>
        {nativeName !== name && (
          <Text className="text-sm font-Jakarta text-text-secondary mt-1">
            {nativeName}
          </Text>
        )}
      </View>
      
      {/* Checkmark */}
      <View className={`
        w-6 h-6 rounded-full border-2 justify-center items-center
        ${isSelected 
          ? 'border-primary-600 bg-primary-600' 
          : 'border-light-300 bg-white'
        }
      `}>
        {isSelected && (
          <Image 
            source={icons.checkmark} 
            className="w-3 h-3"
            style={{ tintColor: '#FFFFFF' }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LanguageCheckbox;