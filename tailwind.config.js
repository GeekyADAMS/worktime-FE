module.exports = {
  jit: true,
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // etc.
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora"],
      },
    },
  },
  plugins: [],
};
