import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
        colors: {
        primary: '#c28285',
        secondary: '#192841',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
} satisfies Config;
