/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF6EE',
        ink: '#23201A',
        forest: '#1F4034',
        leaf: '#3D7A5C',
        harvest: '#DE9B34',
        soil: '#8B5E3C',
        line: '#E4DCC8',
        rust: '#B4552F',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
