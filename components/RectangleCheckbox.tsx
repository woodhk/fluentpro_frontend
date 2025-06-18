import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon, type IconProps } from '@/components/icons/Icon';
import { icons } from '@/constants';

interface SelectableOptionProps {
  id: string;
  name: string;
  description?: string;
  icon: IconProps | { library: string; name: string } | keyof typeof icons;
  isSelected: boolean;
  available?: boolean;
  onSelect: (id: string) => void;
  variant?: 'checkbox' | 'simple';
}

const SelectableOption: React.FC<SelectableOptionProps> = ({
  id,
  name,
  description,
  icon,
  isSelected,
  available = true,
  onSelect,
  variant = 'checkbox',
}) => {
  const handlePress = () => {
    if (available) {
      onSelect(id);
    }
  };

  const renderIcon = () => {
    if (variant === 'simple') {
      // For simple variant (industry), render icon directly
      if (typeof icon === 'object' && 'library' in icon) {
        return (
          <Icon 
            library={icon.library as any}
            name={icon.name as any}
            size={24}
            color={available ? '#234BFF' : '#CCCCCC'}
          />
        );
      } else if (typeof icon === 'object') {
        return (
          <Icon 
            {...icon}
            size={24}
            color={available ? '#234BFF' : '#CCCCCC'}
          />
        );
      } else {
        return (
          <Image 
            source={icons[icon]} 
            className="w-6 h-6"
            style={{ tintColor: available ? '#234BFF' : '#CCCCCC' }}
          />
        );
      }
    } else {
      // For checkbox variant (partners/situations), render icon in circle
      return (
        <View className={`
          w-12 h-12 rounded-full items-center justify-center mr-4
          ${isSelected ? 'bg-primary-600' : 'bg-light-200'}
        `}>
          <Icon 
            library={(icon as any).library}
            name={(icon as any).name}
            size={24}
            color={isSelected ? '#FFFFFF' : '#666666'}
          />
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!available}
      className={`
        flex-row items-center p-4 rounded-xl border-2 ${variant === 'checkbox' ? 'mb-3' : ''}
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
      {variant === 'simple' ? (
        <View className="justify-center items-center mr-4">
          {renderIcon()}
        </View>
      ) : (
        renderIcon()
      )}
      
      {/* Content */}
      <View className="flex-1">
        <Text className={`
          text-base font-JakartaMedium
          ${variant === 'checkbox' && isSelected 
            ? 'text-primary-600' 
            : available 
            ? 'text-text-primary' 
            : 'text-text-secondary'
          }
        `}>
          {name}
        </Text>
        {description && (
          <Text className="text-sm font-Jakarta text-text-secondary mt-1">
            {description}
          </Text>
        )}
      </View>
      
      {/* Checkbox for checkbox variant */}
      {variant === 'checkbox' && (
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
      )}
      
      {/* Lock icon for unavailable options (simple variant only) */}
      {variant === 'simple' && !available && (
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

export default SelectableOption;