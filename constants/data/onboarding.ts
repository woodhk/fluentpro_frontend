/**
 * Onboarding Data
 */

import { images } from '../assets';

export const welcome = [
    {
        id: 1,
        title: "Speak a new language with confidence",
        description:
            "Your journey begins with Fluentpro. Learn Business English effortlessly.",
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

// Part 3 completion screens data
export const part3CompletionScreens = [
  {
    id: 1,
    title: "Time is precious, and that's why Fluentpro lessons are an average of just 5 minutes long!",
    description: "You can pause any time, and when you're ready to restart, it's super easy to pick up from right where you left off!",
    image: images.onboarding2,
  },
  {
    id: 2,
    title: "We all find it hard to stay motivated sometimes! 🤩",
    description: "We have fun monthly challenges with prizes, smart methods to review, and great ways to track your progress\n\nMost importantly, our lessons are designed to keep you interested!",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Finding opportunities to practice English is hard!",
    description: "This is why we built Fluentpro: To make the experience of speaking with someone face-to-face something you can do anytime, anywhere!",
    image: images.onboarding2,
  },
  {
    id: 4,
    title: "Why learn something if you can't remember it?",
    description: "At Fluentpro, we've built proven methods that will not only help you to learn new words and concepts, but to also remember them down the road!",
    image: images.onboarding2,
  },
  {
    id: 5,
    title: "You can and will build confidence over time 💪",
    description: "With Fluentpro, you can practice conversational English with our Fluentpro Tutor\n\nThe next time you need to speak English at work, you won't be stuck at 'Hello'.",
    image: images.onboarding2,
  },
  {
    id: 6,
    title: "Fluentpro is designed for any job role in any industry",
    description: "Our thousands of lessons cover all experiences and topics you encounter at work. We make sure all content is relevant for {role} in the {industry} industry and concepts are explained clearly for you!\n\nYou are capable of it, and it WILL be fun and rewarding!",
    image: images.onboarding2,
  },
  {
    id: 7,
    title: "Let's get Started!",
    description: "You are all set up to start practicing real workplace conversations a {role} in {industry} industry will experience\n\nLet's get started in turning you into a Fluent Professional!",
    image: images.onboarding2,
    buttonText: "Enter Fluentpro",
  },
];