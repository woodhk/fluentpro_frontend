/**
 * UI Component Props
 */

import { TextInputProps, TouchableOpacityProps } from "react-native";

// Button component props
export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

// Input field component props
export interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

// Loading spinner props
export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

// Error message props
export interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  variant?: 'inline' | 'banner' | 'toast';
  className?: string;
}

// Progress bar props
export interface ProgressBarProps {
  progress: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animationDuration?: number;
  showGlow?: boolean;
  showShimmer?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
}