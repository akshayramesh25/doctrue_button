/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cerebri Sans"],
        // sans: ["Cerebri Sans", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        signin: "url('/public/images/signin.png')",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        dark: "#242220",
        welcomeBG: "#1B2433",
        dbGray: "#737373",
        bookingBG: "#7A6EFE",
        sbBgHover: "rgba(15, 60, 190, 0.04)",
        sbTextHover: "#0F3CBE",
        sbText: "#2422208F",
        sbBorder: "#E0E0E0",
        docDetail: "#848382",
        dates: "#F8F8FD",
        queueText: "#676D74",
        queueHover: "#5775F1",
        queueRed: "#E43535",
        selectedDate: "#2ECFF3",
        selectedTareek: "rgba(255, 255, 255, 0.24)",
        availableBG: "#E3F8EC",
        available: "#27AE60",
        onLeaveBG: "#FDE8E8",
        onLeave: "#EB5757",
        doctorsBorder: "#F1F1F2",
        tableStrip: "#FAFAFA",
        behindModal: "rgba(100, 100, 100, 0.5)",
        modalText: "#353C45",
        modalBG: "#9FA2A7",
        closeBG: "rgba(245, 246, 250, 0.60)",
        nextPatient: "#2D9CDB",
        signinBG: "rgba(0, 0, 0, 0.24)",
        signinButton: "#D2D2D2",
        signinText: "#5C6269",
        modalBlur: "rgba(2, 11, 23, 0.32)",
        addDoctor: "#335FE9",
        addDoctorBG: "#D9D9D9",
        editBG: "#335FE6",
        primary: "#13AAFF",
        darkBlue: "#114BBF",
        green: "#1FA19D",
      },
    },
  },
  plugins: [],
};
