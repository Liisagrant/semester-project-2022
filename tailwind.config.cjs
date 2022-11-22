/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.{html,js}', './js/*.js', './js/components/nav.js'],
    theme: {
        colors: {
            mainColor: '#314657',
            SecondColor: '#CCA152',
            lightGray: '#9DB3BE',
            darkGray: '#58626E',
            white: '#FFFFFF',
            black: '#444444',
            green: '#1B4518',
            red: '#F37D7D',
        },
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
};
