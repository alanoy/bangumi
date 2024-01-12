/** @type {import('tailwindcss').Config} */
import { themes } from './config'
export default {
  plugins: [require('daisyui')],
  darkMode: 'class',
  daisyui: {
    themes,
  },
}
