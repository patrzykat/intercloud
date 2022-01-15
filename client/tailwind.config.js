module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "unsplash-cloud": "url('/src/img/unsplash-white-cloud.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
