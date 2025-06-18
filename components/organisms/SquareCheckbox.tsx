import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '@/constants';

interface LanguageCheckboxProps {
  id: string;
  name: string;
  emoji?: string;
  icon?: any; // For icon-based options in future screens
  isSelected: boolean;
  available: boolean;
  onSelect: (id: string) => void;
}

const LanguageCheckbox: React.FC<LanguageCheckboxProps> = ({
  id,
  name,
  emoji,
  icon,
  isSelected,
  available,
  onSelect,
}) => {
  const handlePress = () => {
    if (available) {
      onSelect(id);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!available}
      className={`
        flex-col items-center justify-center p-6 rounded-xl border-2 
        ${isSelected && available
          ? 'border-primary-600 bg-primary-50' 
          : available
          ? 'border-light-300 bg-white'
          : 'border-light-200 bg-light-100'
        }
      `}
      style={{ 
        aspectRatio: 1,
        opacity: available ? 1 : 0.5 
      }}
    >
      {/* Emoji or Icon */}
      <View className="justify-center items-center mb-4">
        {emoji ? (
          <Text className="text-4xl">
            {emoji}
          </Text>
        ) : icon ? (
          <Image 
            source={icon} 
            className="w-10 h-10"
            style={{ tintColor: available ? '#666666' : '#CCCCCC' }}
          />
        ) : (
          <View className="w-10 h-10 bg-light-300 rounded" />
        )}
      </View>
      
      {/* Language Text */}
      <Text className={`
        text-base font-JakartaMedium text-center
        ${available ? 'text-text-primary' : 'text-text-secondary'}
      `}>
        {name}
      </Text>
      
      {/* Lock icon for unavailable languages */}
      {!available && (
        <View className="absolute top-2 right-2">
          <Image 
            source={icons.lock} 
            className="w-4 h-4"
            style={{ tintColor: '#CCCCCC' }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LanguageCheckbox;