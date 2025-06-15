# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FluentPro is a React Native app built with Expo SDK v53, using file-based routing via Expo Router and NativeWind (Tailwind CSS for React Native) for styling. The project uses TypeScript with strict mode and follows modern React Native development practices.

## Development Commands

### Core Development
- `npm start` - Start Expo development server with Metro bundler
- `npm run android` - Launch on Android emulator/device
- `npm run ios` - Launch on iOS simulator/device
- `npm run web` - Launch web version
- `npm run lint` - Run ESLint with Expo configuration

### Project Management
- `npm run reset-project` - Reset to blank Expo template (destructive)

## Architecture

### File-based Routing
- Routes are defined by file structure in `/app` directory
- `app/_layout.tsx` - Root stack navigator layout
- `app/index.tsx` - Home screen component
- Expo Router v5 with typed routes enabled

### Styling System
- **NativeWind v4** - Tailwind CSS implementation for React Native
- Custom color palette defined in `tailwind.config.js`:
  - Primary colors: `primary-50` through `primary-900`
  - Accent colors: `accent-50` through `accent-900`
  - Supporting and functional color variants
- Global styles imported in `app/globals.css`

### Key Dependencies
- **Navigation**: `@react-navigation` suite with bottom-tabs and native screens
- **Animation**: `react-native-reanimated` v3 and `react-native-gesture-handler`
- **Expo Modules**: Image optimization, fonts, blur effects, haptics, symbols, web browser
- **Development**: TypeScript v5.8, ESLint with Expo config

## Configuration Notes

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Path aliases configured (`@/*` maps to project root)
- Expo TypeScript base configuration extended

### Build System
- **Metro**: Configured with NativeWind integration
- **Babel**: Expo preset with NativeWind plugin
- **New Architecture**: Enabled for performance improvements

### Cross-platform Support
All code should work across iOS, Android, and Web platforms. Use platform-specific code only when necessary and leverage Expo's cross-platform APIs.

## Development Practices

When adding new screens, create files in the `/app` directory following the file-based routing convention. Use NativeWind classes for styling and leverage the existing color palette. Import Expo modules rather than platform-specific alternatives when available.