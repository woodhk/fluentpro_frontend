/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {

        // Primary colors + shades
        primary: {
          50: '#EBF6FF',
          100: '#DBEDFF',
          200: '#BEDCFF',
          300: '#97C4FF',
          400: '#6E9FFF',
          500: '#4C7BFF',
          600: '#234BFF', //main
          700: '#203FE2',
          800: '#1D38B6',
          900: '#20368F',
          950: '#131E53',
        },

        // Accent
        accent: '#FF6B35',

        // Supporting colors
        supporting: {
          purple: '#7B61FF',
          teal: '#00D9FF',
          pink: '#FF4A95',
          amber: '#FFB800',
          success: '#E8F8EC',
          error: '#FFEBEA',
          pending: '#FFF5E5',
        },

        // Additional Variants
        varaint: {
          Indigo: '#5856D6',
          Teal: '#00C896',
          Red: '#FF6B6B',
          Blue: '#5AC8FA',
        },

        // Neutral Colors
        dark: {
          100: '#404040',
          200: '#2D2D2D',
          300: '#1A1A1A',
        },
        medium: {
          100: '#999999',
          200: '#808080',
          300: '#666666',
        },
        light: {
          100: '#F8F8F8',
          200: '#F0F0F0',
          300: '#E0E0E0',
        },

        // Functional Colors
        functional: {
          success: '#34C759',
          error: '#FF3B30',
          pending: '#FF9500',
          neutral: '#8E8E93',
        },

        // Text
        text: {
          success: '#1F5E2F',
          error: '#8B1A1A',
          pending: '#663C00',
          primary: '#1A1A1A',      // Same as neutralDark
          secondary: '#666666',    // Same as neutralMedium
          tertiary: '#999999',     // Same as neutralMedium3
          onPrimary: '#FFFFFF',
        },
      }
    },
  },
  plugins: [],
}