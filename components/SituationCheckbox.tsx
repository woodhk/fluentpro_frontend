import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@/components/icons/Icon';

interface SituationCheckboxProps {
  id: string;
  name: string;
  icon: {
    library: string;
    name: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SituationCheckbox: React.FC<SituationCheckboxProps> = ({
  id,
  name,
  icon,
  isSelected,
  onSelect,
}) => {
  const handlePress = () => {
    onSelect(id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`
        flex-row items-center p-4 rounded-xl border-2 mb-3
        ${isSelected
          ? 'border-primary-600 bg-primary-50' 
          : 'border-light-300 bg-white'
        }
      `}
    >
      {/* Icon */}
      <View className={`
        w-12 h-12 rounded-full items-center justify-center mr-4
        ${isSelected ? 'bg-primary-600' : 'bg-light-200'}
      `}>
        <Icon 
          library={icon.library as any}
          name={icon.name as any}
          size={24}
          color={isSelected ? '#FFFFFF' : '#666666'}
        />
      </View>
      
      {/* Content */}
      <View className="flex-1">
        <Text className={`
          text-base font-JakartaMedium
          ${isSelected ? 'text-primary-600' : 'text-text-primary'}
        `}>
          {name}
        </Text>
      </View>
      
      {/* Checkbox */}
      <View className={`
        w-6 h-6 rounded border-2 items-center justify-center
        ${isSelected 
          ? 'border-primary-600 bg-primary-600' 
          : 'border-light-300 bg-white'
        }
      `}>
        {isSelected && (
          <Icon 
            library="ionicons"
            name="checkmark"
            size={16}
            color="#FFFFFF"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SituationCheckbox;