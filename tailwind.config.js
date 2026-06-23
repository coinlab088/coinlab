/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        elevated: 'var(--color-elevated)',
        sunken: 'var(--color-sunken)',
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          brand: 'var(--color-border-brand)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          muted: 'var(--color-primary-muted)',
          disabled: 'var(--color-primary-disabled)',
        },
        secondary: 'var(--color-secondary)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          secondary: 'var(--color-brand-secondary)',
          dark: 'var(--color-brand-dark)',
          muted: 'var(--color-brand-muted)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          bg: 'var(--color-success-bg)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          bg: 'var(--color-danger-bg)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          bg: 'var(--color-warning-bg)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          bg: 'var(--color-info-bg)',
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
        /** 屏幕左右边距 — 16px，对应 layout-screen-x / px-4 */
        gutter: '16px',
        /** 主内容区顶部留白 — 16px */
        content: '16px',
        /** 页面区块上下内边距 — 16px */
        section: '16px',
        /** 紧凑区块上下内边距 — 12px */
        'section-sm': '12px',
        /** 同组元素纵向间距 — 12px */
        stack: '12px',
        /** 紧密纵向间距 — 8px */
        'stack-sm': '8px',
        /** 大区块间距 — 20px */
        'section-lg': '20px',
      },
      maxWidth: {
        mobile: '390px',
      },
    },
  },
  plugins: [],
}
