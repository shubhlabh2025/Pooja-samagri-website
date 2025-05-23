import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import tailwindLineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // <-- adjust paths based on your project structure
  ],
  theme: {
    extend: {
      boxShadow: {
        "cart-card":
          "0 8px 16px rgba(27, 30, 36, 0.06), 0 0 8px rgba(27, 30, 36, 0.04)",
        "top-lg": "0 -8px 12px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [tailwindScrollbarHide, tailwindLineClamp],
};
