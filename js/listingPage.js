import { GET_ALL_LISTINGS_URL } from './settings/api';
import { getToken, getUserName, getUserAvatar } from './utils/storage';
import { formatDate } from './utils/dateFix';

const listingContainer = document.querySelector('#listingsContainer');

const avatar = getUserAvatar();
const userName = getUserName();
const accessToken = getToken();
console.log(userName);
console.log(accessToken);
console.log(avatar);

let data = [];

async function getAllListings() {
    const response = await fetch(GET_ALL_LISTINGS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        data = await response.json();
        console.log(data);
        showListings(data);
    } else {
        const error = await response.json();
        const errorMessage = `Sorry, there is an error ${error}`;
    }
}

const showListings = (data) => {
    listingContainer.innerHTML = '';
    if (!data.length) {
        listingContainer.innerHTML = 'Sorry no listings today';
    } else {
        const listOfListings = data
            .map((data) => {
                const id = data.id;
                const title = data.title;
                const timeEnd = formatDate(data.endsAt);
                const ListingImage = data.media[0];
                let bid = data.bids;
                console.log(bid);
                bid.sort(function (x, y) {
                    return y.amount - x.amount;
                });

                let topBid = 0;
                if (bid[0]) {
                    topBid = bid[0].amount;
                }
                let bidValue = topBid + 0;

                if (!bidValue) {
                    `${0}`;
                }

                let listingMedia = `                                    <img
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
                <a href="detailPage.html?id=${id}" class="mx-2">
                        <li class="bg-lightGray px-2 py-2 rounded-lg hover:scale-105 transition duration-500 cursor-pointer z-0">
                            <div class="space-y-4">
                                <div class="w-full h-60">
                                ${listingMedia}
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <div
                                            class="space-y-1 text-lg font-medium font-Poppins leading-6"
                                        >
                                            <h3>F${title}</h3>
                                            <p
                                                class="text-green font-bold font-Roboto"
                                            >
                                                Currently highest Bid:${bidValue} $
                                            </p>
                                            <h4 class="text-base font-Roboto">
                                                Remaining time: ${timeEnd}
                                            </h4>
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
