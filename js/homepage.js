import { GET_LISTINGS_URL } from './settings/api';
import { getToken, getUserName } from './utils/storage';
import { formatDate } from './utils/dateFix';
const listingContainer = document.querySelector('#listingsContainer');

const userName = getUserName();
let data = [];

async function getAllListings() {
    const response = await fetch(GET_LISTINGS_URL, {
        method: 'GET',
    });

    if (response.ok) {
        data = await response.json();
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
            .map((listing) => {
                const title = listing.title;
                const id = listing.id;
                const listingBody = listing.description;
                const created = listing.created;
                // const bidEnd = listing.endsAt;
                // const media = listing.media;
                const dateFormat = formatDate(listing.endsAt);
                const bid = listing._count.bids;

                let listingMedia = `                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="${listing.media[0]}"
                                        alt="product Image"
                                    />`;
                if (!listing.media[0]) {
                    listingMedia = `
                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="./media/no-photo.jpg"
                                        alt="Product image"
                                    />
                    `;
                }

                return `
                <a h="" class="mx-2">
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
                                                Current Bid:${bid} $
                                            </p>
                                            <h4 class="text-base font-Roboto">
                                                Remaining time: ${dateFormat}
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
