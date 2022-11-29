import { getUserName, getUserAvatar } from '../utils/storage';

const myNavBar = () => {
    const navbarMobile = document.querySelector('#navLinks-mobile');
    const navbarDesktop = document.querySelector('#navLinks-desktop');
    if (navbarMobile) {
        const userName = getUserName();
        let navbarLinksMobile;
        navbarLinksMobile = `
                        <div class="flex flex-col">
                    <a
                        href="./sign-up.html"
                        class="bg-gray-900 font-Poppins text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        aria-current="page"
                        >SignUp</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray hover:text-thirdColor rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        >LogIn</a
                    >
                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray block rounded-md py-2 px-3 text-base font-medium"
                        aria-current="page"
                        >Home</a
                    >
                </div>
        `;
        if (userName) {
            navbarLinksMobile = `
            <div class="flex flex-col">
                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray block rounded-md py-2 px-3 text-base font-medium"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray block rounded-md py-2 px-3 text-base font-medium"
                        >Items in action</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray block rounded-md py-2 px-3 text-base font-medium"
                        >Add a new item</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray block rounded-md py-2 px-3 text-base font-medium"
                        >Profile</a
                    >
                </div>
            `;
        }

        if (navbarDesktop) {
            let navbarLinksDesktop;
            navbarLinksDesktop = `

                    <a
                        href="./sign-up.html"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        aria-current="page"
                        >SignUp</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray hover:text-thirdColor rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        >LogIn</a
                    >
                    <a
                        href="#"
                        class="bg-gray-900 text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        aria-current="page"
                        >Home</a
                    >
            `;
            if (userName) {
                navbarLinksDesktop = `
                        <a
                        href="#"
                        class="bg-gray-900 text-SecondColor hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        aria-current="page"
                        >Home</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        >Items in auction</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                        >Add a new Item</a
                    >

                    <a
                        href="#"
                        class="text-SecondColor font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
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
