import React from 'react';
import { 
  Ionicons, 
  MaterialIcons, 
  Feather, 
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome5
} from '@expo/vector-icons';
import { ComponentProps } from 'react';

type IconLibrary = 
  | 'ionicons' 
  | 'material' 
  | 'feather' 
  | 'font-awesome'
  | 'material-community'
  | 'ant-design'
  | 'entypo'
  | 'font-awesome-5';

type BaseIconProps = {
  library?: IconLibrary;
  size?: number;
  color?: string;
};

type IoniconsProps = BaseIconProps & { library?: 'ionicons'; name: ComponentProps<typeof Ionicons>['name'] };
type MaterialIconsProps = BaseIconProps & { library: 'material'; name: ComponentProps<typeof MaterialIcons>['name'] };
type FeatherProps = BaseIconProps & { library: 'feather'; name: ComponentProps<typeof Feather>['name'] };
type FontAwesomeProps = BaseIconProps & { library: 'font-awesome'; name: ComponentProps<typeof FontAwesome>['name'] };
type MaterialCommunityProps = BaseIconProps & { library: 'material-community'; name: ComponentProps<typeof MaterialCommunityIcons>['name'] };
type AntDesignProps = BaseIconProps & { library: 'ant-design'; name: ComponentProps<typeof AntDesign>['name'] };
type EntypoProps = BaseIconProps & { library: 'entypo'; name: ComponentProps<typeof Entypo>['name'] };
type FontAwesome5Props = BaseIconProps & { library: 'font-awesome-5'; name: ComponentProps<typeof FontAwesome5>['name'] };

export type IconProps = 
  | IoniconsProps 
  | MaterialIconsProps 
  | FeatherProps 
  | FontAwesomeProps
  | MaterialCommunityProps
  | AntDesignProps
  | EntypoProps
  | FontAwesome5Props;

export const Icon = ({ 
  library = 'ionicons', 
  name, 
  size = 24, 
  color = '#000',
  ...props 
}: IconProps) => {
  const iconProps = { name, size, color, ...props };

  switch (library) {
    case 'material':
      return <MaterialIcons {...iconProps as any} />;
    case 'feather':
      return <Feather {...iconProps as any} />;
    case 'font-awesome':
      return <FontAwesome {...iconProps as any} />;
    case 'material-community':
      return <MaterialCommunityIcons {...iconProps as any} />;
    case 'ant-design':
      return <AntDesign {...iconProps as any} />;
    case 'entypo':
      return <Entypo {...iconProps as any} />;
    case 'font-awesome-5':
      return <FontAwesome5 {...iconProps as any} />;
    case 'ionicons':
    default:
      return <Ionicons {...iconProps as any} />;
  }
};
