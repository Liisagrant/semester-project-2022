import { getUserName } from '../utils/storage';

const myNavBar = () => {
    const { pathname } = document.location;
    const navbarMobile = document.querySelector('#navLinks-mobile');
    const navbarDesktop = document.querySelector('#navLinks-desktop');
    if (navbarMobile) {
        const userName = getUserName();
        let navbarLinksMobile;
        navbarLinksMobile = `
                        <div class="flex flex-col p-2">

                    <a
                        href="./homePage.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="./listingPage.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/listingpage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Items in action</a
                    >
                    <a
                        href="./signUp.html"
                        class="bg-gray-900 font-Poppins text-SecondColor hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === './sign-up.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >SignUp</a
                    >

                    <a
                        href="./index.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === './index.html' ? 'bg-onPageColor' : ''
                        }"
                        >LogIn</a
                    >
                </div>
        `;
        if (userName) {
            navbarLinksMobile = `
            <div class="flex flex-col p-2">
                    <a
                        href="./homePage.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="./listingPage.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/listingpage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Items in action</a
                    >

                    <a
                        href="./addListing.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/addListing.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Add a new item</a
                    >

                    <a
                        href="./profile.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/profile.html' ? 'bg-onPageColor' : ''
                        }"
                        >Profile</a
                    >
                </div>
            `;
        }

        if (navbarDesktop) {
            let navbarLinksDesktop;
            navbarLinksDesktop = `

                    <a
                        href="./signUp.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/sign-up.html' ? 'bg-onPageColor' : ''
                        }"
                        aria-current="page"
                        >SignUp</a
                    >

                    <a
                        href="./index.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray hover:text-thirdColor rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/index.html' ? 'bg-onPageColor' : ''
                        }"
                        >LogIn</a
                    >
                                <a
                        href="./homePage.html"
                        class="bg-gray-900 text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                                        <a
                        href="./listingPage.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/listingpage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Items in auction</a
                    >
            `;
            if (userName) {
                navbarLinksDesktop = `
                        <a
                        href="./homePage.html"
                        class="bg-gray-900 text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="./listingPage.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/listingpage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Items in auction</a
                    >

                    <a
                        href="./addListing.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/addListing.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Add a new Item</a
                    >

                    <a
                        href="./profile.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/profile.html' ? 'bg-onPageColor' : ''
                        }"
                        >Profile</a
                    >
                `;
            }
            navbarMobile.innerHTML = `${navbarLinksMobile}`;
            navbarDesktop.innerHTML = `${navbarLinksDesktop}`;
        }
    }
};

export { myNavBar };
