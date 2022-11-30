/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.{html,js}',
        './js/*.js',
        './js/components/createNavbar.js',
        './js/homepage.js',
    ],
    theme: {
        colors: {
            mainColor: '#314657',
            SecondColor: '#CCA152',
            lightGray: '#9DB3BE',
            darkGray: '#58626E',
            white: '#FFFFFF',
            black: '#444444',
            green: '#1B4518',
            red: '#F5ADAD',
            soldRed: '#E75656',
            errorRed: '#890A0A',
            onPageColor: '#526E85',
        },
        extend: {
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
                Lato: ['Lato', 'sans-serif'],
                Roboto: ['Roboto', 'sans-serif'],
            },
        },
    },
};
