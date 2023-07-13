import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
        primary: '#c28285',
        secondary: '#192841',
      },
    },
  },
  plugins: [],
} satisfies Config;
