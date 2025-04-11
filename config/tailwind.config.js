module.exports = {
    content: [
      "../src/**/*.{js,ts,jsx,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        colors: {
          mainColor: '#E25F47',
          lightBeige: '#FDF7EA',
          darkBeige: '#F0D093',
          lightCaramel: '#D48C5B',
          lightWalnut: '#937066',
          darkWalnut: '#473C2C',

          mainWhite: '#F9F9FA',
          subWhite: '#F5F5F5',
          mainBlack: '#17171B',
          subBlack: '#26262D',
          mainGray: '#A8A8A8',
        },
        fontFamily: {
          mainFont: ['HSBombaram2.1'],
          malgun: ['Malgun Gothic'],
          segoeSymbol: ['Segoe UI Symbol'],
          segoeUI: ['Segoe UI'],
        },
      },
    },
    plugins: [
      require("tailwindcss-animate"), 
    ],
  };
