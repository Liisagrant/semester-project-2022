import moment from 'moment';
import { GET_LISTINGS_URL } from './settings/api';

const listingContainer = document.querySelector('#listingsContainer');
const homepageErrorMessage = document.querySelector('#homepageErrorMessage');
const now = moment();
let data = [];
const loader = document.querySelector('#loaderSpinner');

async function getAllListings() {
  const response = await fetch(GET_LISTINGS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    data = await response.json();
    loader.classList.add('hidden');
    showListings(data);
  } else {
    const err = await response.json();
    const message = `${err.errors[0].message}`;
    homepageErrorMessage.innerHTML = `${message}`;
  }
}

const showListings = (data) => {
  listingContainer.innerHTML = '';
  if (!data.length) {
    listingContainer.innerHTML = 'Sorry no listings today';
  } else {
    const listOfListings = data
      .map((listing) => {
        const { id } = listing;
        const { title } = listing;
        const ListingImage = listing.media[0];
        const bid = listing.bids;
        bid.sort((x, y) => y.amount - x.amount);
        const endDate = moment(listing.endsAt);
        const durationLeft = moment.duration(endDate.diff(now));
        const days = Math.floor(durationLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (durationLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
          (durationLeft % (1000 * 60 * 60)) / (1000 * 60)
        );

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

        let listingMedia = `        <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="${ListingImage}"
                                        alt="product Image"
                                    />`;
        if (!ListingImage) {
          listingMedia = `
                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="./media/no-photo.jpg"
                                        alt="Product image"
                                    />
                    `;
        }

        return `
                <a href="detailPage.html?id=${id}" class="mx-2 overflow-hidden">
                        <li class="bg-lightGray px-2 py-2 rounded-lg hover:scale-105 transition duration-500 cursor-pointer z-0">
                            <div class="space-y-4 overflow-hidden">
                                <div class="w-full h-60">
                                ${listingMedia}
                                </div>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <div
                                            class="space-y-1 text-lg font-medium font-Poppins leading-6"
                                        >
                                            <h3>${title}</h3>
                                            <p
                                                class="text-green font-bold font-Roboto"
                                            >
                                                Currently highest Bid:${bidValue} $
                                            </p>
                                         ${timeIs}
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        </a>
            `;
      })
      .join('');
    listingContainer.insertAdjacentHTML('beforeend', listOfListings);
  }
};

getAllListings().then(() => {
  showListings(data);
});
