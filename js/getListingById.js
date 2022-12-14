import moment from 'moment';
import { getToken, updateLocalStorageInfo } from './utils/storage';
import { GET_LISTING_BY_ID_URL, GET_USER_PROFILE_URL } from './settings/api';

const paramstring = window.location.search;
const searchParam = new URLSearchParams(paramstring);
const ID = searchParam.get('id');
const accessToken = getToken();

const listingImageContainer = document.querySelector('#listingImage');
const sellerAvatarContainer = document.querySelector('#sellerAvatar');
const sellerNameContainer = document.querySelector('#sellerName');
const timeEndContainer = document.querySelector('#timeEnd');
const discContainer = document.querySelector('#disc');
const currentBidContainer = document.querySelector('#currentBidContainer');
const titleContainer = document.querySelector('#titleContainer');
const bidList = document.querySelector('#bidList');
const loader = document.querySelector('#loaderSpinner');

const now = moment();

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
    loader.classList.add('hidden');
    const { title } = data;
    const { description } = data;
    const seller = data.seller.name;
    const sellerAvatar = data.seller.avatar;
    const ListingImage = data.media[0];
    const bid = data.bids;
    bid.sort((x, y) => y.amount - x.amount);
    const endDate = moment(data.endsAt);
    const durationLeft = moment.duration(endDate.diff(now));
    const days = Math.floor(durationLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (durationLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((durationLeft % (1000 * 60 * 60)) / (1000 * 60));

    const remainingHours = `Remaining time: ${days}d , ${hours}h and ${minutes} minutes`;
    let timeIs = `
                                          <h4 class="text-base font-Roboto">
                                               ${remainingHours}
                                           </h4>
        `;
    if (minutes < 0) {
      timeIs = `
                                          <h4 class="text-base font-Roboto text-errorRed">
                                               This auction has ended
                                           </h4>
        `;
    }

    let topBid = 0;
    if (bid[0]) {
      topBid = bid[0].amount;
    }
    const bidValue = topBid + 0;

    if (!bidValue) {
      `${0}`;
    }

    let discListing = `
                        <p class="text-xs font-Lato md:max-w-md">
                            ${description}
                        </p>
            `;
    if (!description) {
      discListing = `
                        <p class="text-xs font-Lato md:max-w-md">
                            No description made on this listing
                        </p>
                `;
    }

    discContainer.innerHTML = `${discListing}`;

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
    timeEndContainer.innerHTML = `${timeIs}`;
    currentBidContainer.innerHTML = `Current Bid: ${bidValue}$`;
    titleContainer.innerHTML = `${title}`;
    document.title = `${title}`;

    if (!bid.length) {
      bidList.innerHTML =
        '<p class="text-center">No bids made on this listing<p>';
    }

    for (const bidData of bid) {
      const sellerListing = bidData.bidderName;
      const { amount } = bidData;

      const listing = `
                  <ul role="list" class="divide-y divide-gray-200">
                    <li class="py-4">
                    <div class="flex space-x-3">
                        <div class="flex-1 space-y-1">
                         <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium">${sellerListing}</h3>
                            <p class="text-sm text-gray-500">${amount} $</p>
                        </div>
                    </div>
                    </div>
                </li>
                            </ul>
            `;
      bidList.innerHTML += listing;
    }
  }
};

getListingById();

const seeBidsMadeBtn = document.querySelector('#seeBidsMadeBtn');
const modalBg = document.querySelector('#modalBg');
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

const BID_ON_LISTIN_URL = `${GET_LISTING_BY_ID_URL}/${ID}/bids`;
const bidForm = document.querySelector('#addBidForm');
const inputBid = document.querySelector('#placeBid');
const errorBid = document.querySelector('#errorBid');
const successBid = document.querySelector('#successBid');
const notLoggedInUser = document.querySelector('#notLoggedIN');

if (!accessToken) {
  bidForm.classList.add('hidden');
  notLoggedInUser.classList.remove('hidden');
}

bidForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const bidValue = getListingById();

  if (inputBid.value <= bidValue) {
    errorBid.classList.remove('hidden');
  }

  const amountBid = {
    amount: parseInt(inputBid.value),
  };
  const addBid = async () => {
    const response = await fetch(BID_ON_LISTIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(amountBid),
    });
    if (response.ok) {
      errorBid.innerHTML = '';
      successBid.innerHTML = 'Your Bid is added. Good Luck';
      bidForm.reset();
      setTimeout(() => {
        updateLocalStorageInfo(GET_USER_PROFILE_URL);
      }, 4000);
    } else {
      const err = await response.json();
      const message = `${err.errors[0].message}`;
      errorBid.innerHTML = `${message}`;
      throw new Error(message);
    }
  };
  addBid();
});
