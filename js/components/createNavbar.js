import { getUserName, getUserAvatar } from '../utils/storage';

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
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium  ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >    
                    <a
                        href="./sign-up.html"
                        class="bg-gray-900 font-Poppins text-SecondColor hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/sign-up.html' ? 'bg-onPageColor' : ''
                        }"
                        aria-current="page"
                        >SignUp</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/index.html' ? 'bg-onPageColor' : ''
                        }"
                        >LogIn</a
                    >
                </div>
        `;
        if (userName) {
            navbarLinksMobile = `
            <div class="flex flex-col p-2">
                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/listingpage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Items in action</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                            pathname === '/addItem.html' ? 'bg-onPageColor' : ''
                        }"
                        >Add a new item</a
                    >

                    <a
                        href="#"
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
                        href="#"
                        class="bg-gray-900 text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="./sign-up.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/sign-up.html' ? 'bg-onPageColor' : ''
                        }"
                        aria-current="page"
                        >SignUp</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray hover:text-thirdColor rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/index.html' ? 'bg-onPageColor' : ''
                        }"
                        >LogIn</a
                    >
            `;
            if (userName) {
                navbarLinksDesktop = `
                        <a
                        href="#"
                        class="bg-gray-900 text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/homepage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/listingpage.html'
                                ? 'bg-onPageColor'
                                : ''
                        }"
                        >Items in auction</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                            pathname === '/addItem.html' ? 'bg-onPageColor' : ''
                        }"
                        >Add a new Item</a
                    >

                    <a
                        href="#"
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