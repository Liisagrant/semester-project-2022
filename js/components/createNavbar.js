import { getUserName, getUserCredit, getUserAvatar } from '../utils/storage';

const myNavBar = () => {
  const { pathname } = document.location;
  const navbarMobile = document.querySelector('#navLinks-mobile');
  const navbarDesktop = document.querySelector('#navLinks-desktop');
  if (navbarMobile) {
    const userName = getUserName();
    const credits = getUserCredit();
    let navbarLinksMobile;
    navbarLinksMobile = `
                        <div class="flex flex-col p-2">
                    <a
                        href="./homepage.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                          pathname === '/homepage.html' ? 'bg-onPageColor' : ''
                        }"
                        >Home</a
                    >
                    <a
                        href="./listingpage.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                          pathname === '/listingpage.html'
                            ? 'bg-onPageColor'
                            : ''
                        }"
                        >Items in auction</a
                    >
                    <a
                        href="./signUp.html"
                        class="font-Poppins text-white hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === './sign-up.html' ? 'bg-onPageColor' : ''
                        }"
                        >SignUp</a
                    >
                    <a
                        href="./index.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
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
                        href="./homepage.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                          pathname === '/homepage.html' ? 'bg-onPageColor' : ''
                        }"
                        >Home</a
                    >
                    <a
                        href="./listingpage.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                          pathname === '/listingpage.html'
                            ? 'bg-onPageColor'
                            : ''
                        }"
                        >Items in auction</a
                    >
                    <a
                        href="./addListing.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                          pathname === '/addListing.html'
                            ? 'bg-onPageColor'
                            : ''
                        }"
                        >Add a new item</a
                    >
                    <a
                        href="./profile.html"
                        class="text-white font-Poppins hover:text-lightGray flex justify-center block rounded-md py-2 px-3 text-base font-medium ${
                          pathname === '/profile.html' ? 'bg-onPageColor' : ''
                        }"
                        >Profile</a
                    >
                    <div class="p-2 font-bold font-poppins text-white">
                    <span>Current Credit:${credits}</span>
                    </div>
                    <div class="flex justify-center">
                                </div>
                                    <button
                                        id="logoutbtnMobil"
                                        type="submit"
                                        class="flex w-30 mt-2 font-Roboto justify-center rounded-md bg-lightGray py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-SecondColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Sign Out
                                    </button>
                </div>
            `;
    }

    if (navbarDesktop) {
      let navbarLinksDesktop;
      navbarLinksDesktop = `
                    <a
                        href="./signUp.html"
                        class="text-white font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === '/sign-up.html' ? 'bg-onPageColor' : ''
                        }"
                        aria-current="page"
                        >SignUp</a
                    >
                    <a
                        href="./index.html"
                        class="text-white font-Poppins hover:text-lightGray hover:text-thirdColor rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === '/index.html' ? 'bg-onPageColor' : ''
                        }"
                        >LogIn</a
                    >
                                <a
                        href="./homepage.html"
                        class="text-white hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === '/homepage.html' ? 'bg-onPageColor' : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >
                                        <a
                        href="./listingpage.html"
                        class="text-white font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
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
                        href="./homepage.html"
                        class="text-white hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === '/homepage.html' ? 'bg-onPageColor' : ''
                        }"
                        aria-current="page"
                        >Home</a
                    >
                    <a
                        href="./listingpage.html"
                        class="text-white font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === '/listingpage.html'
                            ? 'bg-onPageColor'
                            : ''
                        }"
                        >Items in auction</a
                    >
                    <a
                        href="./addListing.html"
                        class="text-white font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
                          pathname === '/addListing.html'
                            ? 'bg-onPageColor'
                            : ''
                        }"
                        >Add a new Item</a
                    >
                    <a
                        href="./profile.html"
                        class="text-white font-Poppins hover:text-lightGray rounded-md py-2 px-3 inline-flex items-center text-sm font-medium ${
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
