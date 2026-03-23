/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 马卡龙色系
        'pastel': {
          pink: '#FFB6C1',
          blue: '#B0C4DE',
          green: '#98FB98',
          yellow: '#FFFFE0',
          purple: '#DDA0DD',
          orange: '#FFDAB9'
        },
        // 皇室主题色彩
        'royal': {
          gold: '#FFD700',
          purple: '#9370DB',
          red: '#DC143C'
        }
      },
      fontFamily: {
        'cute': ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-fast': 'pulse 1s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}