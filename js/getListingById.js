import { getToken } from './utils/storage';
import { GET_LISTING_BY_ID_URL } from './settings/api';
import { formatDate } from './utils/dateFix';

const paramstring = window.location.search;
const searchParam = new URLSearchParams(paramstring);
const ID = searchParam.get('id');
const accessToken = getToken();

const singelListingContainer = document.querySelector(
    '#singelListingContainer'
);

const generalErrorMessege = document.querySelector('#generalErrorMessage');

const SINGLE_LISTING_INFO = `${GET_LISTING_BY_ID_URL}/${ID}?_bids=true&_seller=true`;
const getListingById = async () => {
    const response = await fetch(`${SINGLE_LISTING_INFO}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        const { title } = data;
        const { description } = data;
        const timeEnd = formatDate(data.endsAt);
        const seller = data.seller.name;
        const sellerAvatar = data.seller.avatar;
        const ListingImage = data.media[0];
        const bid = data.bids;
        console.log(bid);
        bid.sort((x, y) => y.amount - x.amount);

        let topBid = 0;
        if (bid[0]) {
            topBid = bid[0].amount;
        }
        const bidValue = topBid + 0;

        if (!bidValue) {
            `${0}`;
        }

        let listingMedia = `                                  
                            <img
                            src="${ListingImage}"
                            alt="Product image"
                            class="object-cover h-full w-full rounded-t-md md:rounded-r-none md:rounded-l-md"
                        />                    
    `;
        if (!ListingImage) {
            listingMedia = `
                                    <img
                            src="/media/no-photo.jpg"
                            alt="Product image"
                            class="object-cover h-full w-full rounded-t-md md:rounded-r-none md:rounded-l-md"
                        /> 
                    
                    `;
        }

        let listingMediaAvatar = `                                  
                <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="${sellerAvatar}" alt="seller avatar">     
    `;
        if (!sellerAvatar) {
            listingMediaAvatar = `
                                
            <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="/media/no-photo.jpg" alt="seller avatar">
                    `;
        }

        singelListingContainer.innerHTML = `

                <div class="flex flex-col md:flex-row">
                    <div class="h-40 md:h-80">
                    ${listingMedia}
                    </div>
                    <div>
                        <h1 class="p-2 text-lg font-bold font-Poppins">
                            ${title}
                        </h1>
                        <p class="px-2 text-green font-semibold font-Roboto">
                            Current Bid: ${bidValue}$
                        </p>
                        <p class="p-2 text-xs font-Lato md:max-w-md">
                            ${description}
                        </p>
                        <div
                            class="bg-lightGray rounded-md text-sm w-70 mx-4 my-4"
                        >
                            <p class="p-2 text-center font-Poppins">
                                Bid end at: ${timeEnd}
                            </p>
                        </div>
                    <div class="flex flex-row justify-center p-2 md:h-14">
                            <button
                                type="submit"
                                class="flex justify-center font-Roboto rounded-l-md bg-darkGray p-2 text-sm font-medium text-white shadow-sm hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <svg
                                    class="h-4 m-auto"
                                    viewBox="0 0 49 49"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M48.4922 24.8472C48.4922 38.044 37.7999 48.7364 24.603 48.7364C11.4062 48.7364 0.713867 38.044 0.713867 24.8472C0.713867 11.6503 11.4062 0.958008 24.603 0.958008C37.7999 0.958008 48.4922 11.6503 48.4922 24.8472ZM26.2406 35.8189L39.293 22.7665C40.1984 21.861 40.1984 20.3969 39.293 19.501L37.6554 17.8634C36.7499 16.958 35.2857 16.958 34.3899 17.8634L24.603 27.6503L14.8162 17.8634C13.9107 16.958 12.4465 16.958 11.5507 17.8634L9.91312 19.501C9.00765 20.4065 9.00765 21.8707 9.91312 22.7665L22.9655 35.8189C23.871 36.7243 25.3351 36.7243 26.2406 35.8189Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                            <div
                                class="bg-white py-2 p-4 border-y-2 border-darkGray font-Roboto"
                            >${bidValue}$
                            </div>
                            <button
                                type="submit"
                                class="flex justify-center bg-darkGray p-2 text-sm font-medium text-white shadow-sm hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <svg
                                    class="h-4 m-auto"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 23.8892C0 10.6923 10.6923 0 23.8892 0C37.086 0 47.7783 10.6923 47.7783 23.8892C47.7783 37.086 37.086 47.7783 23.8892 47.7783C10.6923 47.7783 0 37.086 0 23.8892ZM22.2516 12.9175L9.19926 25.9698C8.29378 26.8753 8.29378 28.3395 9.19926 29.2353L10.8368 30.8729C11.7423 31.7784 13.2065 31.7784 14.1023 30.8729L23.8892 21.086L33.676 30.8729C34.5815 31.7784 36.0457 31.7784 36.9415 30.8729L38.5791 29.2353C39.4846 28.3299 39.4846 26.8657 38.5791 25.9698L25.5267 12.9175C24.6213 12.012 23.1571 12.012 22.2516 12.9175V12.9175Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                            <button
                                type="submit"
                                class="flex justify-center font-Roboto rounded-r-md bg-red py-2 px-2 text-md font-bold text-black shadow-sm hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span class="m-auto">ADD BID</span>
                            </button>
                        </div>
                            <div class="flex w-60 items-center justify-center space-x-2 px-4 py-2 mx-auto">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-sm font-medium text-gray-900">${seller}</h3>
          <span class="inline-block flex-shrink-0 rounded-full bg-lightGreen px-2 py-0.5 text-xs font-medium text-green-800">Seller</span>
        </div>
      </div>
      ${listingMediaAvatar}
    </div>
    <div>
    </div>
            </div>
            </div>

    `;
        document.title = `${title}`;
    }
};

getListingById();
