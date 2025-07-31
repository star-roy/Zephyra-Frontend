/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zephyraBlue: "#4A90E2",
        duskHaze: "#CADCFC",
        midnightIndigo: "#2C3E50",
        stormyGrey: "#869AB8",
        cloudWhite: "#F8F9FA",
        zephyraDark: "#0D1B2A",
        zephyraLite: "#EBF2FF"
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
// ✅ Mobile (≤ 640px)

// ✅ Tablet (≥ 768px) – including iPad Mini and up

// ✅ Desktop (≥ 1024px & 1280px)

// ✅ XL screens (≥ 1440px) — like MacBooks or wide monitors