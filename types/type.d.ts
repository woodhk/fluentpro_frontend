import {TextInputProps, TouchableOpacityProps} from "react-native";


declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
}


declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
}

declare interface LanguageOption {
    id: string;
    code: string;
    name: string;
    emoji: string;
    available: boolean;
}

declare interface LanguageCheckboxProps {
    id: string;
    name: string;
    emoji?: string;
    icon?: any;
    isSelected: boolean;
    available: boolean;
    onSelect: (id: string) => void;
}

declare interface IndustryOption {
    id: string;
    name: string;
    icon: {
        library: string;
        name: string;
    };
    available: boolean;
}

declare interface OptionBoxProps {
    id: string;
    name: string;
    icon: {
        library: string;
        name: string;
    } | string;
    isSelected: boolean;
    available: boolean;
    onSelect: (id: string) => void;
}

declare interface RoleSelectionBoxProps {
    role: import('@/lib/types').RoleMatch;
    isSelected: boolean;
    onSelect: (role: import('@/lib/types').RoleMatch) => void;
}


