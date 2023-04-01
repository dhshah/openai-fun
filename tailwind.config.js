import daisyui from "daisyui"
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {},
  plugins: [forms, typography, daisyui],
};
