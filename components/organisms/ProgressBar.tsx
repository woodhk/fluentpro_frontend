import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBarProps } from '@/types/components/ui.types';

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 4,
  backgroundColor = '#E0E0E0',
  progressColor = '#234BFF', // primary-600
  animationDuration = 800,
  showGlow = true,
  showShimmer = true,
  gradientColors,
}) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const animatedWidth = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const shimmerPosition = useSharedValue(0);
  const scaleY = useSharedValue(1);

  useEffect(() => {
    // Animate the progress bar width with smooth easing
    animatedWidth.value = withTiming(clampedProgress, {
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
    });

    // Add a subtle scale animation when progress changes
    if (clampedProgress > 0) {
      scaleY.value = withSequence(
        withTiming(1.2, { duration: 150, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) })
      );
    }

    // Add a subtle glow effect when progress changes
    if (showGlow && clampedProgress > 0) {
      glowOpacity.value = withSequence(
        withTiming(0.8, { duration: 200 }),
        withDelay(300, withTiming(0, { duration: 500 }))
      );
    }

    // Shimmer effect for active progress
    if (showShimmer && clampedProgress > 0 && clampedProgress < 1) {
      shimmerPosition.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [clampedProgress, animationDuration, showGlow, showShimmer]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value * 100}%`,
    transform: [{ scaleY: scaleY.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const animatedShimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerPosition.value,
      [0, 1],
      [-100, 100],
      Extrapolation.CLAMP
    );
    
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [0, 0.5, 1],
        [0, 0.6, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const defaultGradientColors = (gradientColors || [
    progressColor,
    `${progressColor}CC`, // Add some transparency
    progressColor,
  ]) as readonly [string, string, ...string[]];

  return (
    <View 
      style={{
        height,
        backgroundColor,
        borderRadius: height / 2,
        overflow: 'hidden',
        position: 'relative',
        // Add subtle inner shadow for depth
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      {/* Main progress bar with gradient */}
      <Animated.View
        style={[
          {
            height: '100%',
            borderRadius: height / 2,
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
          },
          animatedProgressStyle,
        ]}
      >
        <LinearGradient
          colors={defaultGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            borderRadius: height / 2,
          }}
        />
        
        {/* Shimmer effect */}
        {showShimmer && clampedProgress > 0 && clampedProgress < 1 && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                width: '50%',
              },
              animatedShimmerStyle,
            ]}
          />
        )}
      </Animated.View>
      
      {/* Glow effect overlay */}
      {showGlow && (
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: progressColor,
              borderRadius: height / 2,
              position: 'absolute',
              left: 0,
              top: 0,
              shadowColor: progressColor,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.8,
              shadowRadius: height * 2,
              elevation: 6,
            },
            animatedProgressStyle,
            animatedGlowStyle,
          ]}
        />
      )}
    </View>
  );
};

export default ProgressBar;