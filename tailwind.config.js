module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      photo: "500px",
      popup: "600px",
      auto: "auto",
      2: "0.5rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      14: "3.5rem",
      40: "10rem",
      15: "15%",
      20: "20%",
      25: "25%",
      50: "50%",
      60: "60%",
      70: "70%",
      80: "80%",
      349: "349px",
      header: "50px",
      1_2: "20%",
      full: "100%",
      screen: "100vh",
    },
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    colors: {
      white: "#ffffff",
      blue: {
        medium: "#005c98",
      },
      black: {
        light: "#262626",
        faded: "#00000059",
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
      red: {
        primary: "#ed4956",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
// "tailwindCSS.includeLanguages": {
//   javascript: "javascript",
//   html: "HTML",
// },
