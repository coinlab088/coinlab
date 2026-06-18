/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#000000',
        elevated: '#121212',
        sunken: '#0A0A0A',
        border: {
          DEFAULT: '#2A2A2A',
          subtle: '#1A1A1A',
          brand: '#FFCC0033',
        },
        primary: {
          DEFAULT: '#FFFFFF',
          muted: '#737373',
          disabled: '#525252',
        },
        secondary: '#A3A3A3',
        brand: {
          DEFAULT: '#FFCC00',
          hover: '#E6B800',
          secondary: '#FFD633',
          dark: '#000000',
          muted: '#FFCC001A',
        },
        success: {
          DEFAULT: '#22C55E',
          bg: '#22C55E1A',
        },
        danger: {
          DEFAULT: '#EF4444',
          bg: '#EF44441A',
        },
        warning: {
          DEFAULT: '#FFCC00',
          bg: '#FFCC001A',
        },
        info: {
          DEFAULT: '#A3A3A3',
          bg: '#FFFFFF0D',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['28px', { lineHeight: '34px', fontWeight: '600' }],
        h1: ['22px', { lineHeight: '28px', fontWeight: '600' }],
        h2: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        h3: ['16px', { lineHeight: '22px', fontWeight: '600' }],
        body: ['15px', { lineHeight: '22px', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        caption: ['11px', { lineHeight: '16px', fontWeight: '400' }],
        'price-lg': ['20px', { lineHeight: '24px', fontWeight: '600' }],
        'price-md': ['15px', { lineHeight: '20px', fontWeight: '500' }],
        'price-sm': ['13px', { lineHeight: '18px', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        md: '0 4px 16px rgba(0, 0, 0, 0.6)',
        brand: '0 0 0 1px rgba(255, 204, 0, 0.25)',
      },
      spacing: {
        'tab-bar': '56px',
        header: '48px',
      },
      maxWidth: {
        mobile: '390px',
      },
    },
  },
  plugins: [],
}
