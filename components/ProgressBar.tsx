import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 4,
  backgroundColor = '#E0E0E0',
  progressColor = '#234BFF', // primary-600
}) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  
  return (
    <View 
      style={{
        height,
        backgroundColor,
        borderRadius: height / 2,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          height: '100%',
          width: `${clampedProgress * 100}%`,
          backgroundColor: progressColor,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
};

export default ProgressBar;