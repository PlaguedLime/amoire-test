/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in-left': 'slide-in-left 0.2s ease-in-out forwards',
        'slide-out-left': 'slide-out-left 0.2s ease-in-out forwards',
        'slide-in-right': 'slide-in-right 0.2s ease-in-out forwards',
        'slide-out-right': 'slide-out-right 0.2s ease-in-out forwards',
        'slide-in-top': 'slide-in-top 0.2s ease-in-out forwards',
        'slide-out-top': 'slide-out-top 0.2s ease-in-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.2s ease-in-out forwards',
        'slide-out-bottom': 'slide-out-bottom 0.2s ease-in-out forwards'
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translate(-100%, var(--tw-translate-y))' },
          '100%': { transform: 'translate(0, var(--tw-translate-y))' }
        },
        'slide-out-left': {
          '0%': { transform: 'translate(0, var(--tw-translate-y))' },
          '100%': { transform: 'translate(-100%, var(--tw-translate-y))' }
        },
        'slide-in-right': {
          '0%': { transform: 'translate(100%, var(--tw-translate-y))' },
          '100%': { transform: 'translate(0, var(--tw-translate-y))' }
        },
        'slide-out-right': {
          '0%': { transform: 'translate(0, var(--tw-translate-y))' },
          '100%': { transform: 'translate(100%, var(--tw-translate-y))' }
        },
        'slide-in-top': {
          '0%': { transform: 'translate(var(--tw-translate-x), -100%)' },
          '100%': { transform: 'translate(var(--tw-translate-x), 0)' }
        },
        'slide-out-top': {
          '0%': { transform: 'translate(var(--tw-translate-x), 0)' },
          '100%': { transform: 'translate(var(--tw-translate-x), -100%)' }
        },
      }
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    }
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements'
    })
  ]
}
