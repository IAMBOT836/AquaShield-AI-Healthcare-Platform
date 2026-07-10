/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'on-tertiary-fixed-variant': '#2f2ebe',
        'surface-dim': '#cbdbf5',
        'surface-bright': '#f8f9ff',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-secondary-fixed-variant': '#005236',
        'background': '#f8f9ff',
        'surface-container-highest': '#d3e4fe',
        'surface-container': '#e5eeff',
        'on-tertiary-container': '#f1eeff',
        'on-primary': '#ffffff',
        'secondary': '#006c49',
        'on-tertiary': '#ffffff',
        'tertiary-fixed-dim': '#c0c1ff',
        'on-primary-fixed-variant': '#003ea8',
        'inverse-on-surface': '#eaf1ff',
        'on-primary-fixed': '#00174b',
        'on-error': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'primary': '#004ac6',
        'tertiary-container': '#585be6',
        'inverse-surface': '#213145',
        'inverse-primary': '#b4c5ff',
        'surface-variant': '#d3e4fe',
        'outline-variant': '#c3c6d7',
        'on-background': '#0b1c30',
        'secondary-container': '#6cf8bb',
        'surface-container-low': '#eff4ff',
        'on-primary-container': '#eeefff',
        'surface-tint': '#0053db',
        'primary-fixed-dim': '#b4c5ff',
        'on-secondary-container': '#00714d',
        'on-secondary-fixed': '#002113',
        'primary-container': '#2563eb',
        'outline': '#737686',
        'secondary-fixed': '#6ffbbe',
        'on-surface': '#0b1c30',
        'on-error-container': '#93000a',
        'primary-fixed': '#dbe1ff',
        'tertiary': '#3e3fcc',
        'surface': '#f8f9ff',
        'secondary-fixed-dim': '#4edea3',
        'on-surface-variant': '#434655',
        'tertiary-fixed': '#e1e0ff',
        'surface-container-high': '#dce9ff',
        'on-secondary': '#ffffff'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1.5rem',
        full: '9999px'
      },
      spacing: {
        'card-gap': '24px',
        'section-margin': '64px',
        gutter: '24px',
        'container-padding-mobile': '20px',
        unit: '8px',
        'container-padding-desktop': '40px'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'display-lg-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-md': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '600' }]
      }
    }
  },
  plugins: []
};
