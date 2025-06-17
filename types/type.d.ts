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

declare interface SummaryItemProps {
    title: string;
    description: string;
    icon: {
        library: 'ionicons' | 'material' | 'feather' | 'font-awesome' | 'material-community' | 'ant-design' | 'entypo' | 'font-awesome-5';
        name: string;
    };
    bgColor: string;
    isLast?: boolean;
}

declare interface CommunicationPartner {
    id: string;
    name: string;
    description?: string;
    icon: {
        library: string;
        name: string;
    };
}

declare interface CommunicationPartnerCheckboxProps {
    id: string;
    name: string;
    description?: string;
    icon: {
        library: string;
        name: string;
    };
    isSelected: boolean;
    onSelect: (id: string) => void;
}

declare interface CommunicationSituation {
    id: string;
    name: string;
    icon: {
        library: string;
        name: string;
    };
}

declare interface SituationCheckboxProps {
    id: string;
    name: string;
    icon: {
        library: string;
        name: string;
    };
    isSelected: boolean;
    onSelect: (id: string) => void;
}

declare interface OnboardingSummary {
    native_language: string;
    native_language_display: string;
    industry_id: string;
    industry_name: string;
    role: {
        id: string;
        title: string;
        description: string;
        is_custom: boolean;
        industry_name: string;
    };
    communication_partners: {
        id: string;
        name: string;
        description: string;
        priority: number;
        situations: {
            id: string;
            name: string;
            description: string;
            priority: number;
        }[];
    }[];
    total_partners: number;
    total_situations: number;
    onboarding_status: string;
    is_complete: boolean;
}

declare interface OnboardingSummaryResponse {
    success: boolean;
    message: string;
    summary: OnboardingSummary;
}

declare interface SummaryDisplayItem {
    title: string;
    value: string;
    icon: {
        library: 'ionicons' | 'material' | 'feather' | 'font-awesome' | 'material-community' | 'ant-design' | 'entypo' | 'font-awesome-5';
        name: string;
    };
    bgColor: string;
}


