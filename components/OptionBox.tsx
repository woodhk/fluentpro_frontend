import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon, type IconProps } from '@/components/icons/Icon';
import { icons } from '@/constants';

interface OptionBoxProps {
  id: string;
  name: string;
  icon: IconProps | keyof typeof icons;
  isSelected: boolean;
  available: boolean;
  onSelect: (id: string) => void;
}

const OptionBox: React.FC<OptionBoxProps> = ({
  id,
  name,
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
        flex-row items-center p-4 rounded-xl border-2 
        ${isSelected && available
          ? 'border-primary-600 bg-primary-50' 
          : available
          ? 'border-light-300 bg-white'
          : 'border-light-200 bg-light-100'
        }
      `}
      style={{ 
        opacity: available ? 1 : 0.5 
      }}
    >
      {/* Icon */}
      <View className="justify-center items-center mr-4">
        {typeof icon === 'object' ? (
          <Icon 
            {...icon}
            size={24}
            color={available ? '#234BFF' : '#CCCCCC'}
          />
        ) : (
          <Image 
            source={icons[icon]} 
            className="w-6 h-6"
            style={{ tintColor: available ? '#234BFF' : '#CCCCCC' }}
          />
        )}
      </View>
      
      {/* Text */}
      <Text className={`
        flex-1 text-base font-JakartaMedium
        ${available ? 'text-text-primary' : 'text-text-secondary'}
      `}>
        {name}
      </Text>
      
      {/* Lock icon for unavailable options */}
      {!available && (
        <View className="ml-2">
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

export default OptionBox;