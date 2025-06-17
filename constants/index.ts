import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import calendar from "@/assets/icons/calendar.png"
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpPerson from "@/assets/images/signup-person.png";

export const images = {
    onboarding1,
    onboarding2,
    onboarding3,
    getStarted,
    signUpPerson,
    check,
    noResult,
    message,
};

export const icons = {
    arrowDown,
    arrowUp,
    backArrow,
    calendar,
    chat,
    checkmark,
    close,
    dollar,
    email,
    eyecross,
    google,
    home,
    list,
    lock,
    map,
    marker,
    out,
    person,
    pin,
    point,
    profile,
    search,
    selectedMarker,
    star,
    target,
    to,
};

export const welcome = [
    {
        id: 1,
        title: "Speak a new language with confidence",
        description:
            "Your journey begins with Fluentpro. Learn Business English ffortlessly.",
        image: images.onboarding1,
    },
    {
        id: 2,
        title: "Tailored to your role",
        description:
            "Personalised lessons and learning path for your job role",
        image: images.onboarding2,
    },
    {
        id: 3,
        title: "Your role, your curriculum. Let's go!",
        description:
            "Enter your details, sit back, and let us take care of the rest.",
        image: images.onboarding3,
    },
];

// Native language options for onboarding
export const nativeLanguages = [
  {
    id: 'english',
    code: 'en',
    name: 'English',
    emoji: '🇺🇸',
    available: true,
  },
  {
    id: 'chinese_simplified',
    code: 'zh-hans',
    name: 'Chinese Simplified',
    emoji: '🇨🇳',
    available: true,
  },
  {
    id: 'chinese_traditional',
    code: 'zh-hant',
    name: 'Chinese Traditional',
    emoji: '🇹🇼',
    available: true,
  },
  {
    id: 'spanish',
    code: 'es',
    name: 'Spanish',
    emoji: '🇪🇸',
    available: false,
  },
  {
    id: 'french',
    code: 'fr',
    name: 'French',
    emoji: '🇫🇷',
    available: false,
  },
  {
    id: 'japanese',
    code: 'ja',
    name: 'Japanese',
    emoji: '🇯🇵',
    available: false,
  },
];

// Industry options for onboarding
export const industries = [
  {
    id: 'banking_finance',
    name: 'Banking & Finance',
    icon: {
      library: 'ionicons' as const,
      name: 'cash-outline' as const,
    },
    available: true,
  },
  {
    id: 'shipping_logistics',
    name: 'Shipping & Logistics',
    icon: {
      library: 'ionicons' as const,
      name: 'airplane-outline' as const,
    },
    available: true,
  },
  {
    id: 'real_estate',
    name: 'Real Estate',
    icon: {
      library: 'ionicons' as const,
      name: 'home-outline' as const,
    },
    available: true,
  },
  {
    id: 'hotels_hospitality',
    name: 'Hotels & Hospitality',
    icon: {
      library: 'ionicons' as const,
      name: 'bed-outline' as const,
    },
    available: true,
  },
];

// Role options for onboarding
export const roles = [
  {
    id: 'business_analyst',
    title: 'Business Analyst',
    description: 'Analyze business processes and requirements',
    industry_name: 'Banking & Finance',
    icon: {
      library: 'ionicons' as const,
      name: 'analytics-outline' as const,
    },
  },
  {
    id: 'project_manager',
    title: 'Project Manager',
    description: 'Lead and coordinate project activities',
    industry_name: 'Banking & Finance',
    icon: {
      library: 'ionicons' as const,
      name: 'people-outline' as const,
    },
  },
  {
    id: 'sales_representative',
    title: 'Sales Representative',
    description: 'Drive sales and client relationships',
    industry_name: 'Real Estate',
    icon: {
      library: 'ionicons' as const,
      name: 'trending-up-outline' as const,
    },
  },
];

// Summary data for completion screen
export const summaryData = {
  nativeLanguage: {
    title: 'Native Language',
    icon: {
      library: 'ionicons' as const,
      name: 'language-outline' as const,
    },
    bgColor: '#6366F1', // Indigo
  },
  industry: {
    title: 'Industry',
    icon: {
      library: 'ionicons' as const,
      name: 'business-outline' as const,
    },
    bgColor: '#F59E0B', // Amber
  },
  role: {
    title: 'Role',
    icon: {
      library: 'ionicons' as const,
      name: 'person-outline' as const,
    },
    bgColor: '#10B981', // Emerald
  },
};

// Communication partners for onboarding part 2
export const communicationPartners = [
  {
    id: 'clients',
    name: 'Clients',
    description: 'External customers or clients',
    icon: {
      library: 'ionicons' as const,
      name: 'people-outline' as const,
    },
  },
  {
    id: 'senior_management',
    name: 'Senior Management',
    description: 'Company leadership and executives',
    icon: {
      library: 'ionicons' as const,
      name: 'business-outline' as const,
    },
  },
  {
    id: 'suppliers',
    name: 'Suppliers',
    description: 'External suppliers and vendors',
    icon: {
      library: 'ionicons' as const,
      name: 'construct-outline' as const,
    },
  },
  {
    id: 'customers',
    name: 'Customers',
    description: 'End customers and consumers',
    icon: {
      library: 'ionicons' as const,
      name: 'person-circle-outline' as const,
    },
  },
  {
    id: 'colleagues',
    name: 'Colleagues',
    description: 'Team members and coworkers',
    icon: {
      library: 'ionicons' as const,
      name: 'people-circle-outline' as const,
    },
  },
  {
    id: 'stakeholders',
    name: 'Stakeholders',
    description: 'Project stakeholders and interested parties',
    icon: {
      library: 'ionicons' as const,
      name: 'git-network-outline' as const,
    },
  },
  {
    id: 'partners',
    name: 'Partners',
    description: 'Business partners and collaborators',
    icon: {
      library: 'ionicons' as const,
      name: 'link-outline' as const,
    },
  },
];

// Communication situations for onboarding part 2
export const communicationSituations = [
  {
    id: 'meetings',
    name: 'Meetings',
    icon: {
      library: 'ionicons' as const,
      name: 'people-outline' as const,
    },
  },
  {
    id: 'presentations',
    name: 'Presentations',
    icon: {
      library: 'ionicons' as const,
      name: 'easel-outline' as const,
    },
  },
  {
    id: 'training_sessions',
    name: 'Training Sessions',
    icon: {
      library: 'ionicons' as const,
      name: 'school-outline' as const,
    },
  },
  {
    id: 'client_conversations',
    name: 'Client Conversations',
    icon: {
      library: 'ionicons' as const,
      name: 'chatbubbles-outline' as const,
    },
  },
  {
    id: 'interviews',
    name: 'Interviews',
    icon: {
      library: 'ionicons' as const,
      name: 'person-add-outline' as const,
    },
  },
  {
    id: 'conflict_resolution',
    name: 'Conflict Resolution',
    icon: {
      library: 'ionicons' as const,
      name: 'shield-checkmark-outline' as const,
    },
  },
  {
    id: 'phone_calls',
    name: 'Phone Calls',
    icon: {
      library: 'ionicons' as const,
      name: 'call-outline' as const,
    },
  },
  {
    id: 'one_on_ones',
    name: 'One-on-Ones',
    icon: {
      library: 'ionicons' as const,
      name: 'person-circle-outline' as const,
    },
  },
  {
    id: 'feedback_sessions',
    name: 'Feedback Sessions',
    icon: {
      library: 'ionicons' as const,
      name: 'thumbs-up-outline' as const,
    },
  },
  {
    id: 'team_discussions',
    name: 'Team Discussions',
    icon: {
      library: 'ionicons' as const,
      name: 'people-circle-outline' as const,
    },
  },
  {
    id: 'negotiations',
    name: 'Negotiations',
    icon: {
      library: 'ionicons' as const,
      name: 'handshake-outline' as const,
    },
  },
  {
    id: 'status_updates',
    name: 'Status Updates',
    icon: {
      library: 'ionicons' as const,
      name: 'clipboard-outline' as const,
    },
  },
  {
    id: 'informal_chats',
    name: 'Informal Chats',
    icon: {
      library: 'ionicons' as const,
      name: 'cafe-outline' as const,
    },
  },
  {
    id: 'briefings',
    name: 'Briefings',
    icon: {
      library: 'ionicons' as const,
      name: 'document-text-outline' as const,
    },
  },
  {
    id: 'video_conferences',
    name: 'Video Conferences',
    icon: {
      library: 'ionicons' as const,
      name: 'videocam-outline' as const,
    },
  },
];

// Part 2 summary data for completion screen
export const part2SummaryData = {
  partners: {
    title: 'Communication Partners',
    icon: {
      library: 'ionicons' as const,
      name: 'people-outline' as const,
    },
    bgColor: '#8B5CF6', // Purple
  },
  situations: {
    title: 'Communication Situations',
    icon: {
      library: 'ionicons' as const,
      name: 'chatbubbles-outline' as const,
    },
    bgColor: '#EC4899', // Pink
  },
};

// Part 3 final summary data for completion screen
export const part3SummaryData = {
  nativeLanguage: {
    title: 'Native Language',
    icon: {
      library: 'ionicons' as const,
      name: 'language-outline' as const,
    },
    bgColor: '#6366F1', // Indigo
  },
  industry: {
    title: 'Industry',
    icon: {
      library: 'ionicons' as const,
      name: 'business-outline' as const,
    },
    bgColor: '#F59E0B', // Amber
  },
  role: {
    title: 'Role',
    icon: {
      library: 'ionicons' as const,
      name: 'person-outline' as const,
    },
    bgColor: '#10B981', // Emerald
  },
  partners: {
    title: 'Partners',
    icon: {
      library: 'ionicons' as const,
      name: 'people-outline' as const,
    },
    bgColor: '#8B5CF6', // Purple
  },
};

export const data = {
    welcome,
    nativeLanguages,
    industries,
    roles,
    summaryData,
    part2SummaryData,
    part3SummaryData,
    communicationPartners,
    communicationSituations,
};