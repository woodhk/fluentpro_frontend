export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flagCode: string;
  flag?: any; // For static assets if available
}

export const LANGUAGES: Language[] = [
  // English
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flagCode: 'us',
  },
  
  // Common Asian Languages
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: 'Chinese',
    flagCode: 'cn',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: 'Japanese',
    flagCode: 'jp',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: 'Korean',
    flagCode: 'kr',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'Hindi',
    flagCode: 'in',
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'Thai',
    flagCode: 'th',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Vietnamese',
    flagCode: 'vn',
  },
  
  // Common European Languages
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flagCode: 'es',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flagCode: 'fr',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flagCode: 'de',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flagCode: 'it',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flagCode: 'pt',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Russian',
    flagCode: 'ru',
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flagCode: 'nl',
  },
];

// Helper functions
export const getLanguageByCode = (code: string): Language | undefined => 
  LANGUAGES.find(lang => lang.code === code);

export const getLanguageByFlagCode = (flagCode: string): Language | undefined => 
  LANGUAGES.find(lang => lang.flagCode === flagCode);

// Get flag URL from CDN
export const getFlagUrl = (flagCode: string, size: 'png72' | 'png144' | 'png288' = 'png72'): string => {
  return `https://flagpedia.net/data/flags/${size}/${flagCode.toLowerCase()}.png`;
};

// Common languages for faster loading (you can add static assets later)
export const COMMON_LANGUAGE_CODES = ['en', 'es', 'fr', 'de', 'zh', 'ja'];