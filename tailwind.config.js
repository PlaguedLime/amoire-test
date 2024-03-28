/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
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
