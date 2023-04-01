import daisyui from "daisyui"
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      fun: 'AnakCute',
    },
  },
  plugins: [forms, typography, daisyui],
};
