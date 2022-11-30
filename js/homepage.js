import { GET_LISTINGS_URL } from './settings/api';
import { getToken, getUserName } from './utils/storage';
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
                const bidEnd = listing.endsAt;
                // const media = listing.media;
                // const bid = listing._count.bids;
                let bid = [];

                let listingMedia = `                                    <img
                                        class="rounded-lg h-60 w-full shadow-lg"
                                        src="${listing.media[0]}"
                                        alt="product Image"
                                    />`;
                if (!listing.media[0]) {
                    listingMedia = `
                                    <img
                                        class="rounded-lg h-60 w-full shadow-lg"
                                        src="./media/No-Photo.jpg"
                                        alt="Product image"
                                    />
                    `;
                }

                return `
                        <li class="bg-lightGray px-2 py-2 rounded-lg">
                            <div class="space-y-4">
                                <div class="aspect-w-3 aspect-h-2">
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
                                                Remaining time: ${bidEnd}
                                            </h4>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                class="flex font-Roboto justify-center rounded-md bg-darkGray py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                view
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
            `;
            })
            .join('');
        listingContainer.insertAdjacentHTML('beforeend', listOfListings);
    }
};

getAllListings().then(() => {
    showListings(data);
});
