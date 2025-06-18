import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '../atoms/icons/Icon';

interface SummaryItemProps {
  title: string;
  description: string;
  icon: {
    library: 'ionicons' | 'material' | 'feather' | 'font-awesome' | 'material-community' | 'ant-design' | 'entypo' | 'font-awesome-5';
    name: string;
  };
  bgColor: string;
  isLast?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ 
  title, 
  description, 
  icon, 
  bgColor,
  isLast = false
}) => {
  return (
    <View className={`py-6 px-6 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <View className="flex-row items-center">
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: bgColor }}
        >
          <Icon
            library={icon.library}
            name={icon.name as any}
            size={24}
            color="white"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-JakartaMedium text-text-tertiary mb-1">
            {title}
          </Text>
          <Text className="text-base font-JakartaSemiBold text-text-primary">
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryItem;