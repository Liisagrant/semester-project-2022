import {
    getToken,
    getUserAvatar,
    getUserCredit,
    getUserName,
} from './utils/storage';
import { validImgUrl } from './utils/validation';
import { GET_PROFILE_URL, UPDATE_AVATAR_URL } from './settings/api';
import { formatDate } from './utils/dateFix';

const accessToken = getToken();
if (!accessToken) {
    location.href = '/notLoggedIn.html';
}

const avatar = getUserAvatar();
const profileAvatarContainer = document.querySelector('#profielAvatar');
const profileCreditsContainer = document.querySelector('#profielCredits');
const profileNameAndEmailContainer =
    document.querySelector('#profielNameEmail');
const listingContainer = document.querySelector('#listingsContainer');

//Get User InFo
const getUserInfo = async () => {
    const response = await fetch(GET_PROFILE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (response.ok) {
        console.log(response);
        const data = await response.json();
        const name = data.name;
        const email = data.email;
        const avatar = data.avatar;
        const credits = data.credits;
        const listings = data.listings;
        console.log(listings);
        console.log(data);

        profileAvatarContainer.innerHTML = `
                                            <img
                                                class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                                src="${avatar}"
                                                alt="User Avatar"
                                            />
        
        `;
        profileCreditsContainer.innerHTML = `
                                            <span
                                                >Current Credit:
                                                ${credits}</span
                                            >
        `;

        profileNameAndEmailContainer.innerHTML = `
                                        <h1
                                            class="truncate text-2xl font-bold text-gray-900 font-Poppins">
                                            ${name}
                                        </h1>
                                            <h2 class="font-Lato font-bold">
                                                ${email}
                                            </h2>
        
        `;

        for (let list of listings) {
            console.log(list);
            const id = list.id;
            console.log(id);
            const title = list.title;
            const timeEnd = formatDate(list.endsAt);
            const image = list.media[0];
            console.log(image);

            let listingMedia = `                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="${image}"
                                        alt="product Image"
                                    />`;
            if (!image) {
                listingMedia = `
                                    <img
                                        class="rounded-lg object-cover h-full w-full shadow-lg"
                                        src="./media/no-photo.jpg"
                                        alt="Product image"
                                    />
                    `;
            }

            let listing = `
             <a href="detailPage.html?id=${id}" class="mx-2">
                                        <li
                                            class="bg-lightGray px-2 py-2 rounded-lg hover:scale-105 transition duration-500 cursor-pointer z-0"
                                        >
                                            <div class="space-y-4">
                                                <div
                                                    class="aspect-w-3 aspect-h-2"
                                                >
                                                                            <div class="w-full h-60">
                                ${listingMedia}
                                </div>
                                
                                                </div>

                                                <div class="space-y-2">
                                                    <div
                                                        class="flex justify-between"
                                                    >
                                                        <div
                                                            class="space-y-1 text-lg font-medium font-Poppins leading-6"
                                                        >
                                                            <h3>${title}</h3>
                                                            <h4
                                                                class="text-sm font-Roboto"
                                                            >
                                                                Remaining time:
                                                                ${timeEnd}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        </a>
            `;
            listingContainer.innerHTML += listing;
        }
    }
};

getUserInfo();

//GET Modal And Update avatar
const updateBtn = document.querySelector('#updateAvatar');
console.log(updateBtn);
const form = document.querySelector('#updateAvatarForm');
const modalBg = document.querySelector('#modal-background');
const updateAvatarUrl = document.querySelector('#img-url');
console.log(updateAvatarUrl);
const avatarUrlError = document.querySelector('#imageUrlError');
const avtarUrlError2 = document.querySelector('#imageUrlError2');

updateBtn.addEventListener('click', (e) => {
    modalBg.classList.remove('hidden');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isAvatarValid = false;
    isAvatarValid = validImgUrl(updateAvatarUrl.value);
    if (isAvatarValid) {
        avatarUrlError.classList.add('hidden');
    } else {
        avatarUrlError.classList.remove('hidden');
    }

    let isNotEmpty = false;
    if (updateAvatarUrl.value !== '') {
        avtarUrlError2.classList.add('hidden');
        isNotEmpty = true;
    } else {
        avtarUrlError2.classList.remove('hidden');
    }

    let avatarFormIsValid = isAvatarValid && isNotEmpty;

    if (avatarFormIsValid) {
        const avatarData = {
            avatar: updateAvatarUrl.value,
        };

        console.log(avatarData);
        (async function updateAvatar() {
            const response = await fetch(UPDATE_AVATAR_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(avatarData),
            });
            if (response.ok) {
                location.reload();
            } else {
                const error = await response.json();
                console.log(error);
            }
        })();
    }
});
