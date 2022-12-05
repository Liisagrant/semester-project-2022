/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.{html,js}', './js/*.js', './js/components/createNavbar.js'],
    theme: {
        colors: {
            mainColor: '#314657',
            SecondColor: '#CCA152',
            lightGray: '#9DB3BE',
            darkGray: '#58626E',
            white: '#FFFFFF',
            black: '#444444',
            green: '#1B4518',
            lightGreen: '#A4F0C3',
            red: '#F5ADAD',
            soldRed: '#E75656',
            errorRed: '#890A0A',
            onPageColor: '#526E85',
        },
        extend: {
            backgroundImage: {
                notLoggedIn:
                    "url('https://res.cloudinary.com/djnonssa4/image/upload/v1669922508/rudra-pratap-barik-nAJWCfynVN8-unsplash_hdqbgs.jpg')",
            },
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
                Lato: ['Lato', 'sans-serif'],
                Roboto: ['Roboto', 'sans-serif'],
            },
        },
    },
};
