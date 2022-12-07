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
const listingImageContainer = document.querySelector('#listingImage');
const sellerAvatarContainer = document.querySelector('#sellerAvatar');
const sellerNameContainer = document.querySelector('#sellerName');
const bidValueContainer = document.querySelector('#bidValue');
const timeEndContainer = document.querySelector('#timeEnd');
const discContainer = document.querySelector('#disc');
const currentBidContainer = document.querySelector('#currentBidContainer');
const titleContainer = document.querySelector('#titleContainer');
const bidList = document.querySelector('#bidList');
console.log(bidList);

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
        const title = data.title;
        const description = data.description;
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

        let discListing = `
                            <p class="p-2 text-xs font-Lato md:max-w-md">
                            ${description}
                        </p>
            `;
        if (!description) {
            discListing = `
                            <p class="p-2 text-xs font-Lato md:max-w-md">
                            No description made on this listing
                        </p>
                `;
        }

        discContainer.innerHTML = `${discListing}`;
        console.log(disc);

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
        listingImageContainer.innerHTML = `${listingMedia}`;

        let listingMediaAvatar = `                                  
                <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="${sellerAvatar}" alt="seller avatar">     
    `;
        if (!sellerAvatar) {
            listingMediaAvatar = `
                                
            <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="/media/no-photo.jpg" alt="seller avatar">
                    `;
        }

        sellerAvatarContainer.innerHTML = `${listingMediaAvatar}`;
        sellerNameContainer.innerHTML = `${seller}`;
        bidValueContainer.innerHTML = `${bidValue}`;
        timeEndContainer.innerHTML = `Bid end at:  ${timeEnd}`;
        currentBidContainer.innerHTML = `Current Bid: ${bidValue}$`;
        titleContainer.innerHTML = `${title}`;
        document.title = `${title}`;

        if (!bid.length) {
            bidList.innerHTML = `<p class="text-center">No bids made on this listing<p>`;
        }

        for (let data of bid) {
            console.log(data);
            const seller = data.bidderName;
            const amount = data.amount;
            console.log(seller);

            let listing = `
                <li class="py-4">
                    <div class="flex space-x-3">
                        <div class="flex-1 space-y-1">
                         <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium">${seller}</h3>
                            <p class="text-sm text-gray-500">${amount} $</p>
                        </div>
                    </div>
                    </div>
                </li>
            `;
            bidList.innerHTML += listing;
        }
    }
};

getListingById();

const seeBidsMadeBtn = document.querySelector('#seeBidsMadeBtn');

const x = document.querySelector('#x');

seeBidsMadeBtn.onclick = () => {
    modalBg.classList.remove('hidden');
};

modalBg.onclick = () => {
    modalBg.classList.add('hidden');
};

x.onclick = () => {
    modalBg.classList.add('hidden');
};
