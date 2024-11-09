/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: "#5D5FEF",
        lightGrayText: "#737791",
        mainHeading: "#151D48",
        smallTextColor: "#425166"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
