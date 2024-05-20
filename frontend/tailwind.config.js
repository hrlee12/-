/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      inputBoxColor: '#EAD8C6',
      frameColor: '#CBA57F',
      groupColor: '#DECEBE',
      btnRed: '#F21F0C',
      btnBlue: '#04B1D9',
      btnGreen: '#4CA732',
      btnNavy: '#201D35',
      btnGray: '#7d7d7d',
    },
    extend: {
      fontFamily: {
        neo: ['NeoDunggeunmo'],
        dnf: ['DNFBitBitv2'],
      },
      width: {
        boxWidth: '410px',
      },
      height: {
        boxHeight: '510px',
      },
      borderRadius: {
        boxRadius: '50px',
      },
      boxShadow: {
        inputBoxShadow: 'inset -4px -4px 3px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        wordBox: "url('public/assets/wordBox.png')",
      },
    },
  },
  plugins: [scrollbarHide],
};
