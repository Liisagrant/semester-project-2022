/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.{html,js}', './js/*.js', './js/components/nav.js'],
    theme: {
        colors: {
            mainColor: '#314657',
            SecondColor: '#CCA152',
            thirdColor: '#9DB3BE',
            fourthColor: '#58626E',
            whiteColor: '#FFFFFF',
        },
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
};
