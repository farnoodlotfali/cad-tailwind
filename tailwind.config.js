/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "10/10": "100%",
      },
      colors: {
        primary: {
          50: "#cdf5ff",
          100: "#abdff5",
          200: "#8cc5df",
          300: "#69acc8",
          400: "#4e98b6",
          500: "#2b85a5",
          600: "#1a7693",
          700: "#00617c",
          800: "#004e66",
          900: "#00384e",
          dark: "#005269",
          light: "#E5EFF2",
          extraLight: "#F5F7F9",
        },
        secondary: {
          50: "#ebf0f3",
          100: "#ced9df",
          200: "#b0bfc9",
          300: "#91a6b3",
          400: "#7a92a1",
          500: "#627f90",
          600: "#56707f",
          700: "#475c69",
          800: "#384953",
          900: "#27343c",
          dark: "#232C32",
        },
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        IRANSansXV: ["IRANSansXV", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": `-webkit-radial-gradient(50% 0%, circle closest-corner, transparent 0, transparent 200px, #00617c 201px, #00617c 102px)`,
        pattern: "url('../../public/Assets/images/Pattern.svg')",
        steering_wheel: "url('../../public/Assets/images/bg_steering_wheel.svg')",
        cardboard_box: "url('../../public/Assets/images/bg_cardboard_box.svg')",
      },
      borderRadius: {
        "card-border": "25px",
      },
      fontSize: {
        "3.2xl": "32px",
      },
    },
  },
  plugins: [],
};
