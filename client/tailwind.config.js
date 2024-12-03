import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulseScale: 'pulseScale 2s ease-in-out infinite',
      },
      keyframes: {
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [daisyui],
};




