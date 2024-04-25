/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inputBoxColor: '#EAD8C6',
    },
    extend: {
      fontFamily: {
        neo: ['NeoDunggeunmo'],
        dnf: ['DNFBitBitv2'],
      },

      boxShadow: {
        inputBoxShadow: 'inset -4px -4px 3px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
