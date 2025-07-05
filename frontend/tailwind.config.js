module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        lora: ['var(--font-lora)'],
      },
    },
  },
  plugins: [],
};
