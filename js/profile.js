import {
    getToken,
    getUserAvatar,
    getUserCredit,
    getUserName,
} from './utils/storage';
import { validImgUrl } from './utils/validation';
import { GET_PROFILE_URL, UPDATE_AVATAR_URL } from './settings/api';

const accessToken = getToken();
if (!accessToken) {
    location.href = '/notLoggedIn.html';
}

const avatar = getUserAvatar();

const profileAvatarContainer = document.querySelector('#profielAvatar');
const profileCreditsContainer = document.querySelector('#profielCredits');
const profileNameAndEmailContainer =
    document.querySelector('#profielNameEmail');

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
    }
};

getUserInfo();

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
