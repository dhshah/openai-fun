import daisyui from "daisyui"
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      'yoda': '#f59090',
      'yoda-content': '#000',
      'yellow': colors.yellow,
    },
    fontFamily: {
      fun: 'AnakCute',
    },
  },
  plugins: [forms, typography, daisyui],
};
