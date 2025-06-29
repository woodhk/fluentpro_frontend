# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FluentPro is a React Native app built with Expo SDK v53 for professional communication and language learning. It features comprehensive onboarding flows, role-playing capabilities, and uses file-based routing via Expo Router with NativeWind for styling. The project uses TypeScript with strict mode and follows modern React Native development practices.

## Development Commands

### Core Development
- `npm start` - Start Expo development server with Metro bundler
- `npm run android` - Launch on Android emulator/device
- `npm run ios` - Launch on iOS simulator/device
- `npm run web` - Launch web version
- `npm run lint` - Run ESLint with Expo configuration

### Project Management
- `npm run reset-project` - Reset to blank Expo template (destructive)

## Architecture Overview

### State Management & Authentication
- **Redux Toolkit** for global state management with feature-based slices
- **Clerk** for authentication and user management with token caching
- **Async Storage** for local data persistence
- **Expo Secure Store** for sensitive data storage

### Route Structure & Navigation
The app uses **route groups** (parentheses syntax) for logical organization:

```
app/
├── _layout.tsx              # Root layout with providers (Clerk, Redux, fonts)
├── index.tsx                # Auth loading screen with redirect logic
├── (auth)/                  # Authentication flows
├── (root)/                  # Authenticated app sections
│   ├── (onboarding)/        # Multi-part onboarding (part-01, part-02, part-03)
│   └── (tabs)/              # Main app with bottom navigation
```

**Key routing patterns:**
- **Progressive onboarding** with structured multi-part flows
- **Nested layouts** for different app sections
- **Tab-based main navigation** for core app features
- **Route groups** for auth state separation

### Component Architecture (Atomic Design)

```
components/
├── atoms/                   # Basic building blocks (CustomButton, InputField, icons)
├── molecules/               # Simple combinations (LoadingButton, SignOutButton)
├── organisms/               # Complex UI components (ProgressBar, form components)
└── templates/               # Page-level layouts (OnboardingTemplate)
```

**Template system:**
- `OnboardingTemplate` - Standardized layout for onboarding screens with progress, navigation, and content areas
- `OnboardingSelectionTemplate` - Specialized template for selection-based onboarding steps

### Business Logic & Services

```
lib/
├── api/                     # API clients and endpoints
│   ├── clerk-client.ts      # Clerk authentication API
│   ├── client.ts            # Main API client
│   └── onboarding.api.ts    # Onboarding-specific endpoints
├── services/                # Business logic services
│   ├── api-init.service.ts  # API initialization
│   ├── onboarding-redirect.service.ts # Navigation logic
│   └── storage.service.ts   # Local storage abstraction
└── store/                   # Redux store configuration
    ├── hooks.ts             # Typed Redux hooks
    ├── index.ts             # Store configuration
    └── slices/onboarding/   # Feature-based Redux slice
```

### Styling System
- **NativeWind v4** - Tailwind CSS implementation for React Native
- **Plus Jakarta Sans** font family with multiple weights (Regular, Medium, SemiBold, Bold, ExtraBold, ExtraLight, Light)
- **Comprehensive color system** in `tailwind.config.js`:
  - Primary colors: `primary-50` through `primary-950` (main: `primary-600`)
  - Accent color: `accent` (#FF6B35)
  - Supporting colors: purple, teal, pink, amber with success/error/pending states
  - Functional colors: success, error, pending, neutral
  - Text hierarchy: primary, secondary, tertiary, onPrimary

### Key Dependencies & Integrations
- **Authentication**: Clerk with Expo token cache
- **State Management**: Redux Toolkit with typed hooks
- **Navigation**: Expo Router v5 with React Navigation
- **Styling**: NativeWind v4 with Tailwind CSS
- **Animation**: React Native Reanimated v3
- **Cross-platform**: Expo modules for image, fonts, haptics, web browser

## Configuration Notes

### Provider Hierarchy
Root layout wraps the app with essential providers in this order:
```tsx
<ClerkProvider>
  <Provider store={store}>
    <Stack screenOptions={{ headerShown: false }}>
```

### TypeScript Configuration
- Strict mode enabled with path aliases (`@/*` maps to project root)
- Feature-based type organization in `/types` directory
- Component prop types and API response types separated

### Build System
- **Metro**: Configured with NativeWind integration
- **Babel**: Expo preset with NativeWind plugin
- **New Architecture**: Enabled for React Native performance improvements

## Development Patterns

### Component Creation
1. Follow atomic design principles (atoms → molecules → organisms → templates)
2. Use existing templates for consistent layouts
3. Leverage the comprehensive color system and typography scale
4. Import Expo modules rather than platform-specific alternatives

### State Management
- Use feature-based Redux slices with selectors, thunks, and reducers
- Utilize typed hooks from `lib/store/hooks.ts`
- Keep business logic in service layer, not components

### Navigation & Routing
- Create new screens in appropriate route groups within `/app` directory
- Use file-based routing convention with meaningful names
- Leverage nested layouts for section-specific navigation patterns

### Cross-platform Support
All code should work across iOS, Android, and Web platforms. The project uses Expo's universal APIs and NativeWind for consistent cross-platform styling.